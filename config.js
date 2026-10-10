/**
 * ====================================================================
 * PORTFOLIO FIREBASE WEB CONFIGURATION
 * ====================================================================
 * 
 * Firebase web configuration is public; Firestore rules enforce write access.
 */

const PORTFOLIO_CONFIG = {

  firebase: {
    projectId: "interactiveportfolio-4788f",
    apiKey: "AIzaSyD94vBHqzO8hgkPlsQTjLSJSzKKCnc4VqU"
  }
};
window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;

function getPortfolioCloudUrl() {
  if (PORTFOLIO_CONFIG.firebase && PORTFOLIO_CONFIG.firebase.projectId && PORTFOLIO_CONFIG.firebase.apiKey) {
    return `https://firestore.googleapis.com/v1/projects/${PORTFOLIO_CONFIG.firebase.projectId}/databases/(default)/documents/portfolio_data/main?key=${PORTFOLIO_CONFIG.firebase.apiKey}`;
  }
  return null;
}
