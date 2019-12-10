/*
background scripts, managing events

include in manifest.json
"background": {
  "scripts": ["background.js"],
  "persistent": false
}
*/


// alert("hello world");


/*
 chrome.history.search({text: '', maxResults: 10}, function(data) {
     data.forEach(function(page) {
         console.log(page.url);
     });
 });
*/

let t = 0;
let pT = 0;
let load = false;
//calculate the lastVisitTime
function milliConv(milli) {

  let t = [1, 1000, 60, 60];
  //milli,second,minute,hour
  for (i = 1; i < 4; i++) {
    t[i] = t[i - 1] * t[i];
  }
  //calculate milli in array

  if (milli < t[1]) {
    return "now"
  } else if (milli < t[2]) {
    return Math.round(milli / t[1]) + " second"
  } else if (milli < t[3]) {
    return Math.round(milli / t[2]) + " minute"
  } else {
    return Math.round(milli / t[3]) + " hour"
  }
  //return string based on time
};



chrome.webNavigation.onCompleted.addListener(buttonClicked //function() {
  //triggered when page is loaded

  //   chrome.history.search({
  //     text: '',
  //     maxResults: 100
  //   }, function(data) {
  //     data.forEach(function(page, i) {
  //       // console.log(i);
  //       // console.log(page.title);
  //       // console.log(page.url);
  //       // console.log(page.visitCount);
  //       // console.log(page.lastVisitTime);
  //       // console.log(Date.now() - page.lastVisitTime);
  //       // console.log(milliConv(Date.now() - page.lastVisitTime));
  //       // console.log(page);
  //     });
  //   });
  //
  // }, {
  //   url: [{
  //     urlMatches: 'https://www.nytimes.com/'
  //   }]
  // });
  //}
);


function logHistory(tab) {
  chrome.history.search({
    text: '',
    maxResults: 2
  }, function(data) {
    data.forEach(function(page, i) {
      // console.log(i);
      // console.log(page.title);
      // console.log(page.url);
      // console.log(page.visitCount);
      // console.log(page.lastVisitTime);
      // console.log(Date.now() - page.lastVisitTime);
      // console.log(milliConv(Date.now() - page.lastVisitTime));
      // console.log(page);
      chrome.tabs.sendMessage(tab.tabId, page);
    });
  });
}



// chrome.browserAction.onClicked.addListener(buttonClicked);
// Handle that click
function buttonClicked(tab) {
  // Send a message to the active tab

  //see if newly loaded
  t = tab.timeStamp;
  //check if its loading the same page(2000ms)
  if ((t - pT) > 2000) {
    //different/new req
    load = true;
  } else {
    load = false
  }
  if (load) {
    logHistory(tab)
  }


  pT = t;


}



// Listening for messages
chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
  console.log("requested");
  // if (request.message === "thank you") {
  //   // Not doing anything for messages received but I could!
  // }
}
