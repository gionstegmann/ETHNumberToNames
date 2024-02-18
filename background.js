chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        nameStyle: 'short', // Default to 'short' names
        addBrackets: true, // Add brackets by default
        isEnabled: true, // Enable the extension by default
    }, () => {
        console.log('Default settings initialized');
    });
});