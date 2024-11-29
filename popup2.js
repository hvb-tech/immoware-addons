alert("Popup.js is running!");

console.log("Popup.js is running!");
// ... rest of the code ...

document.addEventListener("DOMContentLoaded", function () {
    const userInputField = document.getElementById("base-url");
    const submitButton = document.getElementById("submit-btn");
  
    submitButton.addEventListener("click", function () {
      const userInput = userInputField.value.trim();
      // Do something with the user input
      console.log("User input:", userInput);
      // You can also send the input to a background script using chrome.runtime.sendMessage()
      chrome.runtime.sendMessage({ action: "handleUserInput", input: userInput });
    });
  });