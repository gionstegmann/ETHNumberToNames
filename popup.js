document.addEventListener('DOMContentLoaded', function () {
    // Load the saved preferences and update the UI accordingly
    chrome.storage.local.get(['nameStyle', 'addBrackets'], function (data) {
        if (data.nameStyle) {
            document.querySelector(`input[name="nameStyle"][value="${data.nameStyle}"]`).checked = true;
        }
        document.getElementById('brackets').checked = !!data.addBrackets;
    });

    // Save the preferences when the Save button is clicked
    document.getElementById('save').addEventListener('click', () => {
        const nameStyle = document.querySelector('input[name="nameStyle"]:checked').value;
        const addBrackets = document.getElementById('brackets').checked;

        chrome.storage.local.set({ nameStyle, addBrackets }, () => {
            console.log('Settings saved');
            // Optionally, provide feedback or close the popup
        });
    });
});
