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



/* const btn = document.querySelector('#downloadButton');

if (btn) {
    console.log("Button found:", btn);
} else {
    console.log("Button not found");
}

*/


/*
try {
    dlButton.addEventListener('click', () => {
        alert('Button clicked. Starting script.')
        chrome.runtime.sendMessage({ action: 'downloadPdf'});
    });
    } catch (error) {
        alert("Error. Download button not found.");
} 

*/

/*
window.onload = function() {
    alert("Window is loaded.")
    const btn = document.querySelector('#downloadButton');
    alert(btn);
        
    if (btn) {
        btn.addEventListener('click', () => {
            alert('Button clicked. Starting script.')
            chrome.runtime.sendMessage({ action: 'downloadPdf'});
        });
    } else {
        alert("Error. Download button not found.");
    }
}; 
*/

/*
document.getElementById("downloadButton").addEventListener("click", function() {
    alert("I am clicked");
    console.log(downloadButton);
});
*/

//alert("popup js is running!");

/* chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {action: "downloadPdf"});
    alert("Message is sent!");
});
*/


/*

// this didn't work no more.

chrome.runtime.sendMessage({greeting: "hello"}, function(response){
    console.log(response.farewell);
})

*/


/* THIS WORKED !!

chrome.storage.local.set({ downloadAction: null}, () =>{
    console.log("Action saved to storage.");
});


document.getElementById("downloadButton").addEventListener("click", () => {
    console.log("Button clicked - saving to localStorage.");
    //localStorage.setItem("downloadAction", "downloadPdf");
    chrome.storage.local.set({ downloadAction: "downloadPdf"}, () =>{
        console.log("Action saved to storage.");
    });
});
*/
