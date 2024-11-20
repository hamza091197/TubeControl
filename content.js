function togglePlayPause() {
    const video = document.querySelector('video');
    if (video) {
      chrome.storage.sync.get(['playPauseEnabled'], (result) => {
        if (result.playPauseEnabled !== false) { // default to true
          if (document.hidden || !document.hasFocus()) {
            video.pause();
          } else {
            video.play();
          }
        }
      });
    }
  }
  
  // Function to remove YouTube ads
  function removeAds() {
    chrome.storage.sync.get(['adBlockEnabled'], (result) => {
      if (result.adBlockEnabled !== false) { // default to true
        const adSelectors = [
          '.video-ads',           // Ad container
          '.ytp-ad-module',       // In-video ads
          '.ytp-ad-overlay-container', // Overlay ads
          '.ytp-ad-player-overlay'     // Ad player overlay
        ];
  
        adSelectors.forEach(selector => {
          const ads = document.querySelectorAll(selector);
          ads.forEach(ad => ad.remove());
        });
      }
    });
  }
  
  // Monitor for new ads and remove them
  const observer = new MutationObserver(() => {
    removeAds();
  });
  
  // Observe changes to the body to catch dynamically loaded ads
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Add event listeners for visibility change and window focus/blur
  document.addEventListener('visibilitychange', togglePlayPause);
  window.addEventListener('focus', togglePlayPause);
  window.addEventListener('blur', togglePlayPause);
  
  // Run initially to set the correct state and remove any initial ads
  togglePlayPause();
  removeAds();
  