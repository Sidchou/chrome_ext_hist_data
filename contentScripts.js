/*
load on new page, accassing DOMs
include in manifest.json
"content_scripts":[
  {
    "matches":["<all_urls>"],
    "js":["contentScripts.js"]
  }
]
*/


// alert("hello world");
chrome.runtime.onMessage.addListener(loadBrowserHistory);

// Handle the message --> sample code from Shiffman
function loadBrowserHistory(request, sender, sendResponse) {
          console.log(request)


    // // Now if the message matches "browser action"
    if (request.message) {
      console.log("responding")

        // // Send a message back!
        chrome.runtime.sendMessage({
            "message": "thank you"
        });
    }
}
