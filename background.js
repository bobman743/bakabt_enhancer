function getUserPageURL() {
  return "https://bakabt.me/user/1983187/bobman743";
}

function notifyUpdate(torrents) {
  browser.notifications.create(null, {
    "type": "basic",
    "title": "BakaBT Enhancer",
    "message": `Reloaded ${Object.keys(torrents).length} torrents`
  });
}

function updateTorrents() {
  function onGetUserPage() {
     let parser = new DOMParser();
     let userPageDocument = parser.parseFromString(userPageRequest.responseText, "text/html");

     let torrents = {};

     ["active", "inactive"].forEach(function(status) {
        Array.prototype.forEach.call(
          userPageDocument.getElementById(status).getElementsByClassName("torrent"),
          function(element) {
            torrents[element.dataset.torrentid] = status;
          });
     });

     // this is async, need to check for errors (?)
     browser.storage.local.set({"torrents": torrents}).then(
      function() {notifyUpdate(torrents)});

  }
  var userPageRequest = new XMLHttpRequest();
  userPageRequest.addEventListener("load", onGetUserPage);
  userPageRequest.open("GET", getUserPageURL());
  userPageRequest.send();
}

browser.browserAction.onClicked.addListener(updateTorrents);
