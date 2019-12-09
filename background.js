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

function milliConv(milli) {

  let t = [1, 1000, 60, 60];
  //milli,second,minute,hour
  for (i = 1; i < 4; i++) {
    t[i] = t[i - 1] * t[i];
  }

  if (milli < t[1]) {
    return "now"
  } else if (milli < t[2]) {
    return Math.round(milli / t[1]) + " second"
  } else if (milli < t[3]) {
    return Math.round(milli / t[2]) + " minute"
  } else {
    return Math.round(milli / t[3]) + " hour"
  }
}

chrome.webNavigation.onCompleted.addListener(function() {


  data();
  //triggered when page is loaded

  chrome.history.search({
    text: '',
    maxResults: 100
  }, function(data) {
    data.forEach(function(page, i) {
      console.log(i);
      console.log(page.title);
      console.log(page.url);
      console.log(page.visitCount);
      console.log(page.lastVisitTime);
      console.log(Date.now() - page.lastVisitTime);
      console.log(milliConv(Date.now() - page.lastVisitTime));

    });
  });

}, {
  url: [{
    urlMatches: 'https://www.nytimes.com/'
  }]
});

chrome.browserAction.onClicked.addListener((e) => {
  // chrome.tabs.sendMessage( {
  //     "message": "browser action"
  //   }
  // );

  chrome.runtime.sendMessage(
    {"message": "browser action"}
    //,(m)=>console.log(m)
  )

  console.log(e);
}
);


function receiver(request, sender, sendResponse) {
  if (request.message === "thank you") {
    // Not doing anything for messages received but I could!
  }
}
