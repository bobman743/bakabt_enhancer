console.log("start of enhance.js");

document.body.style.border = "5px solid red";

//Redo this as a function that takes an element and just returns {"isLinkToTorrentPage": true, "torrentId": xxxx}
function isLinkToTorrentPage(element) {
  let components = element.pathname.split("/");

  return ((components[0] == "") && (components[1] == "torrent"));
}

function getTorrentId(element) {
  return element.pathname.split("/")[2];
}

function foo() {
  console.log("Injecting...");

  function onGetTorrents(storageData) {
    console.log("Got torrent list. Attempting to update anchors...");

    //console.log(document.getElementsByTagName("a"));
    Array.prototype.forEach.call(
      document.getElementsByTagName("a"),
      function(element) {
        if (isLinkToTorrentPage(element)) {
          if (storageData.torrents[getTorrentId(element)] == "active") {
            element.className += " enhance-active";
          } else if (storageData.torrents[getTorrentId(element)] == "inactive") {
            element.className += " enhance-inactive";
          }
        }
      });

    console.log(storageData.torrents);
  }

  browser.storage.local.get("torrents").then(onGetTorrents);
}

foo();
// console.log(document.getElementsByTagName("a"));

console.log("end of enhance.js");
