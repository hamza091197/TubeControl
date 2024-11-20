document.addEventListener('DOMContentLoaded', () => {
    const togglePlayPause = document.getElementById('togglePlayPause');
    const toggleAdBlock = document.getElementById('toggleAdBlock');
  
    // Load the saved state from storage
    chrome.storage.sync.get(['playPauseEnabled', 'adBlockEnabled'], (result) => {
      togglePlayPause.checked = result.playPauseEnabled !== false; // default to true
      toggleAdBlock.checked = result.adBlockEnabled !== false; // default to true
    });
  
    // Save the state when the checkbox is toggled
    togglePlayPause.addEventListener('change', () => {
      chrome.storage.sync.set({ playPauseEnabled: togglePlayPause.checked });
    });
  
    toggleAdBlock.addEventListener('change', () => {
      chrome.storage.sync.set({ adBlockEnabled: toggleAdBlock.checked });
    });
  });
  