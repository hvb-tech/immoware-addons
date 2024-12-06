// Get the current URL
const baseUrl = window.location.href;
console.log(baseUrl);


// Function to extract the URL of the last page link
function extractLastPageUrl() {

    const dlDetails = []; //init return value for extraction

    // Select all paginationControl elements
    const paginationControls = document.querySelectorAll('.paginationControl');

    // Loop through all pagination controls
    for (const paginationControl of paginationControls) {
        // Check if any anchor tag within this control contains "dmsDocPage" in the href
        const hasDmsDocPage = Array.from(paginationControl.querySelectorAll('a')).some(link => link.href.includes('dmsDocPage'));

        if (hasDmsDocPage) {
            console.log("Found a paginationControl with dmsDocPage in URLs.");

            // Select the last page link (last anchor tag with class 'nextprev')
            const lastPageLink = paginationControl.querySelector('a.nextprev:last-of-type');

            if (lastPageLink) {
                const lastPageUrl = lastPageLink.href; // Get the href of the last page link
                dlDetails.push(lastPageUrl);
                console.log(`Last Page URL: ${dlDetails[0]}`);

                // Extract the page number from the URL
                const urlParts = lastPageUrl.split('/'); // Split the URL by '/'
                const pageNumberIndex = urlParts.indexOf('dmsDocPage') + 1; // Find the index of 'dmsDocPage' and get the next part

                let pageNumber = null;
                if (pageNumberIndex < urlParts.length) {
                    pageNumber = parseInt(urlParts[pageNumberIndex], 10); // Convert the next part to an integer
                    dlDetails.push(pageNumber);
                    console.log(`Extracted Page Number: ${dlDetails[1]}`);

                    // Construct a new URL without the page number
                    const modifiedUrl = urlParts.slice(0, pageNumberIndex).join('/') + '/'; // Join parts up to dmsDocPage
                    dlDetails.push(modifiedUrl); // Push the modified URL without the page number
                    console.log(`Modified URL without page number: ${dlDetails[2]}`);

                } else {
                  console.log('Page number not found in the last page link URL. Manually pushed 1.');
                }
                
                return dlDetails
            } else {
                console.log('Last page link not found in the pagination control.');
            }

            break; // Exit the loop after finding the first valid control
        } else {

          // edge case if it's only one page: no dmsDocPage in href. -> 

          // baseUrl equals the last page
          dlDetails.push(baseUrl);
          // there's only 1 page to loop through
          dlDetails.push(1);
          //
          const modifiedUrl = baseUrl + '/dmsDocPage/' ;
          dlDetails.push(modifiedUrl);
        }
    }

  return dlDetails
}


async function downloadLinks(url) {
    // Fetch the HTML content of the page
    const response = await fetch(url);
    const html = await response.text();
  
    // Parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Select all elements with the class 'icon_item_download' and title 'download'
    const dlLinks = doc.querySelectorAll('a.icon_item_download[title="herunterladen"]');
  
    // Loop through each link and simulate a click with a delay
    dlLinks.forEach((link, index) => {
      setTimeout(() => {
        // Create a new anchor element in the current page's DOM
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.download = link.download;
  
        // Simulate a click on the new anchor element
        anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      }, index * 500); // 500ms delay between each click
    });
  }


  async function downloadPdf(urlLink, pageNumber){

    for (let i = 1; i <= pageNumber; i++) {
        // Update the URL with the current page number
        const url = `${urlLink}${i}`;
        console.log(`Page ${i} opened`);
        await downloadLinks(url);
        await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay between pages
      }

      console.log("Finished download.");
  }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* actual execution code starts here */
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === "download") {
    console.log("Request to download received!");
    sendResponse({status: "BUSY WITH DOWNLOAD"});

    try {
      const details = await extractLastPageUrl(); // Await the Promise to get the resolved value
      console.log(details);

      if (details.length === 3) { // Ensure that you have the expected data
        await downloadPdf(details[2], details[1]); // Await the downloadPdf function
      } else {
        console.error('Expected details not found:', details);
      }

    } catch (error) {
      console.error('Error during download process:', error);
      sendResponse({status: "ERROR", message: error.message});
    }
  }
});