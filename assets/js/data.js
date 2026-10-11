/* Shared portfolio data loader and cross-tab synchronization. */

const ENABLE_REMOTE_DATA = true;
const DATA_VERSION = 2;
const CLOUD_URL =
  typeof getPortfolioCloudUrl === "function" ? getPortfolioCloudUrl() : null;

let data = {};
let dataUpdatedAt = "";
let currentLang = localStorage.getItem("portfolio_lang") || "fr";

async function loadPortfolioData() {
  if (ENABLE_REMOTE_DATA && CLOUD_URL) {
    try {
      const response = await fetch(CLOUD_URL, { cache: "no-store" });
      if (response.ok) {
        const document = await response.json();
        const payload = document.fields?.payload?.stringValue;
        const remoteData = typeof payload === "string" ? JSON.parse(payload) : null;
        if (
          document.fields?.dataVersion?.integerValue === String(DATA_VERSION) &&
          remoteData?.personal
        ) {
          data = remoteData;
          dataUpdatedAt =
            document.fields?.updatedAt?.stringValue ||
            document.updateTime ||
            new Date().toISOString();
          localStorage.setItem(
            "portfolio_cache",
            JSON.stringify({ version: DATA_VERSION, data, updatedAt: dataUpdatedAt }),
          );
          return;
        }
      }
    } catch (error) {
      console.warn("Firestore unavailable; loading bundled portfolio data.", error);
    }
  }

  const response = await fetch("data/portfolio.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Could not load data/portfolio.json (HTTP ${response.status}).`);
  }
  data = await response.json();
}

const portfolioDataReady = loadPortfolioData();

portfolioDataReady
  .then(() => {
    if (!ENABLE_REMOTE_DATA) return;

    try {
      const channel = new BroadcastChannel("portfolio_sync");
      channel.onmessage = (event) => {
        const update = event.data;
        if (
          update?.type !== "DATA_UPDATED" ||
          update.version !== DATA_VERSION ||
          !update.data?.personal ||
          !update.updatedAt ||
          (dataUpdatedAt && update.updatedAt <= dataUpdatedAt)
        ) {
          return;
        }
        data = update.data;
        dataUpdatedAt = update.updatedAt;
        renderAll();
      };
    } catch (error) {
      console.warn("Cross-tab portfolio sync is unavailable.", error);
    }

    window.addEventListener("storage", (event) => {
      if (event.key !== "portfolio_cache" || !event.newValue) return;
      try {
        const cached = JSON.parse(event.newValue);
        if (
          cached.version === DATA_VERSION &&
          cached.data?.personal &&
          cached.updatedAt &&
          (!dataUpdatedAt || cached.updatedAt > dataUpdatedAt)
        ) {
          data = cached.data;
          dataUpdatedAt = cached.updatedAt;
          renderAll();
        }
      } catch (error) {
        console.warn("Updated portfolio cache is invalid.", error);
      }
    });
  })
  .catch((error) => {
    console.error("Portfolio data could not be initialized.", error);
  });
