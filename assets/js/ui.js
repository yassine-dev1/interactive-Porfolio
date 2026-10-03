/* Theme, navigation, CV and contact interactions. */

function toggleTheme() {
      const html = document.documentElement;
      const isDark = html.classList.contains('dark');
      if (isDark) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('portfolio_theme', 'light');
      } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('portfolio_theme', 'dark');
      }
      lucide.createIcons();
    }

    function toggleMobileMenu() {
      document.getElementById('mobileDrawer').classList.toggle('open');
    }
    function closeMobileMenu() {
      document.getElementById('mobileDrawer').classList.remove('open');
    }



    async function fetchLatestFromCloud() {
      if (!CLOUD_URL) return;
      try {
        const res = await fetch(CLOUD_URL, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json && json.fields && json.fields.payload && json.fields.payload.stringValue) {
            const parsed = JSON.parse(json.fields.payload.stringValue);
            if (parsed && parsed.personal) {
              data = parsed;
              localStorage.setItem('portfolio_cache', JSON.stringify(data));
              renderAll();
            }
          }
        }
      } catch (err) {}
    }

    function handleContactSubmit(e) {
      e.preventDefault();
      const f=[...e.target.querySelectorAll('input,textarea')].map(x=>x.value);
      const to=(data.contact&&data.contact.email)||'';
      const body=encodeURIComponent((f[2]||'')+'\n\n— '+(f[0]||'')+' ('+(f[1]||'')+')');
      window.location.href='mailto:'+to+'?subject='+encodeURIComponent('Contact portfolio – '+(f[0]||''))+'&body='+body;
      e.target.reset();
    }

    async function downloadOfficialCv(e, which) {
      if (e) e.preventDefault();
      closeCvMenu();
      const isEn = which === 'en';
      const p = (data && data.personal) ? data.personal : {};
      const fallbackName = (p.fullName ? p.fullName.trim().replace(/\s+/g, '_') : 'Candidate') + '_CV.pdf';
      const fileName = isEn ? (p.cvFileNameEn || 'Resume_Yassine_Eljarjini_EN.pdf') : (p.cvFileName || fallbackName);
      const fileUrl = isEn ? (p.cvUrlEn || 'resumes/Resume_Yassine_Eljarjini_EN.pdf') : ((p && p.cvUrl) ? p.cvUrl : 'resumes/Resume_Yassine_Eljarjini_FR.pdf');

      // 1. Direct external web links (e.g. Google Drive, OneDrive, external URL)
      if (/^https?:\/\//i.test(fileUrl)) {
        window.open(fileUrl, '_blank');
        return;
      }

      // 2. Base64 Data URL (uploaded directly via Admin Studio)
      if (fileUrl.startsWith('data:application/pdf') || fileUrl.startsWith('data:;base64')) {
        try {
          const arr = fileUrl.split(',');
          const mime = (arr[0].match(/:(.*?);/) || [])[1] || 'application/pdf';
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const blob = new Blob([u8arr], { type: mime });
          const blobUrl = window.URL.createObjectURL(blob);
          const tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = blobUrl;
          tempLink.setAttribute('download', fileName);
          document.body.appendChild(tempLink);
          tempLink.click();
          setTimeout(() => {
            document.body.removeChild(tempLink);
            window.URL.revokeObjectURL(blobUrl);
          }, 1000);
          return;
        } catch (err) {
          console.warn('Base64 data URL conversion fallback:', err);
        }
      }

      // 3. Local relative file path
      try {
        const response = await fetch(fileUrl, { cache: 'no-cache' });
        if (!response.ok) throw new Error('Fetch failed');
        const blob = await response.blob();
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const blobUrl = window.URL.createObjectURL(pdfBlob);

        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobUrl;
        tempLink.setAttribute('download', fileName);
        document.body.appendChild(tempLink);
        tempLink.click();

        setTimeout(() => {
          document.body.removeChild(tempLink);
          window.URL.revokeObjectURL(blobUrl);
        }, 1000);
      } catch (err) {
        const fallbackLink = document.createElement('a');
        fallbackLink.href = fileUrl;
        fallbackLink.setAttribute('download', fileName);
        fallbackLink.target = '_blank';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
      }
    }

    function closeCvMenu() {
      const m = document.getElementById('cvMenu'); if (m) m.classList.remove('open');
      const b = document.getElementById('topCvDownloadBtn'); if (b) b.setAttribute('aria-expanded', 'false');
    }
    function toggleCvMenu(e) {
      e.stopPropagation();
      const o = document.getElementById('cvMenu').classList.toggle('open');
      document.getElementById('topCvDownloadBtn').setAttribute('aria-expanded', String(o));
    }
    document.addEventListener('click', e => { if (!e.target.closest('#cvDropdown')) closeCvMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCvMenu(); });

    document.addEventListener('DOMContentLoaded', init);

