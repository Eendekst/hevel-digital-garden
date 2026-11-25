
      const tagId = "G-DRRTCZ4WNT";
      const gtagScript = document.createElement('script');
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(tagId);
      gtagScript.defer = true;
      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', tagId, { send_page_view: false });
        gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
        document.addEventListener('nav', () => {
          gtag('event', 'page_view', { page_title: document.title, page_location: location.href });
        });
      };

      document.head.appendChild(gtagScript);
    