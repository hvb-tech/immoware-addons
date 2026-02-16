document.addEventListener('DOMContentLoaded', () => {
    const dlButton = document.getElementById('downloadButton');

    console.log(dlButton);

    dlButton.addEventListener('click', function() {
        // Sending message to content.js
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "download"}, function(response) {
                    if (chrome.runtime.lastError) {
                        console.error("Error:", JSON.stringify(chrome.runtime.lastError));
                    } else if (response) {
                        console.log("Response Status:", response.status);
                    } else {
                        console.error("No response received.");
                    }
            }); 
        } else {
                console.error("No active tab found.");
            }
        });
    });
});
