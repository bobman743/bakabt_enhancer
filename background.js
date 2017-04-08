// function handleStartup() {
//   alert("foo");
// }

// browser.runtime.onStartup.addListener(handleStartup);

function getUserPageURL() {
  return "https://bakabt.me/user/1983187/bobman743";
}

function updateTorrents() {
  function onGetUserPage() {
     let parser = new DOMParser();
     let userPageDocument = parser.parseFromString(userPageRequest.responseText, "text/html");

     let torrents = {};

     Array.prototype.forEach.call(
      userPageDocument.getElementById("active").getElementsByClassName("torrent"),
      function(element) {
        torrents[element.dataset.torrentid] = "active";
      });

      Array.prototype.forEach.call(
      userPageDocument.getElementById("inactive").getElementsByClassName("torrent"),
      function(element) {
        console.log("inactive:");
        console.log(element);
        console.log(element.dataset.torrentid);
        torrents[element.dataset.torrentid] = "inactive";
        console.log(torrents[element.dataset.torrentid]);
      });

     console.log(torrents);

     // this is async
     browser.storage.local.set({"torrents": torrents});
  }
  var userPageRequest = new XMLHttpRequest();
  userPageRequest.addEventListener("load", onGetUserPage);
  userPageRequest.open("GET", getUserPageURL());
  userPageRequest.send();
}


// function openMyPage() {
//   // this is async, should check for errors
//   //browser.storage.local.set({"fookey": "foovalue"});

//   function reqListener () {
//     let parser = new DOMParser();
//     let xmlDoc = parser.parseFromString(oReq.responseText, "text/html");
//     console.log(xmlDoc);
//     browser.storage.local.set({"foo": xmlDoc});

//     Array.prototype.forEach.call(temp0.getElementById("active").getElementsByClassName("torrent"), function(element) { console.log(element.dataset.torrentid); });

//   }

//   var oReq = new XMLHttpRequest();
//   oReq.addEventListener("load", reqListener);
//   oReq.open("GET", "https://bakabt.me/user/1983187/bobman743");
//   oReq.send();

//   browser.tabs.create({
//     "url": "/status.html"
//   });
// }


/*
Add openMyPage() as a listener to clicks on the browser action.
*/
browser.browserAction.onClicked.addListener(updateTorrents);
