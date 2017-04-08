//Redo this as a function that takes an element and just returns {"isLinkToTorrentPage": true, "torrentId": xxxx}
function isLinkToTorrentPage(element) {
  let components = element.pathname.split("/");

  return ((components[0] == "") && (components[1] == "torrent"));
}

function getTorrentId(element) {
  return element.pathname.split("/")[2];
}

function inject() {

  function onGetTorrents(storageData) {

    Array.prototype.forEach.call(
      document.getElementsByTagName("a"),
      function(element) {
        if (isLinkToTorrentPage(element)) {
          // This is a dumb way of doing this
          // Also need to add class idempotently, reloading the plugin will apply this multiple times
          if (storageData.torrents[getTorrentId(element)] == "active") {
            element.className += " enhance-active";
          } else if (storageData.torrents[getTorrentId(element)] == "inactive") {
            element.className += " enhance-inactive";
          }
        }
      });
  }

  browser.storage.local.get("torrents").then(onGetTorrents);
}

inject();
