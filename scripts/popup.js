const dlButton = document.getElementById('downloadButton');
console.log(dlButton);

dlButton.addEventListener('click', function() {
    //sending msg to content.js
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "download"}, function(response) {
            console.log(response.status);
        });
    });
});
