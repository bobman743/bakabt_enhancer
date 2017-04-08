function onGet(item) {
    document.write(item);
}

function onError(error) {
    console.log(`error: ${error}`);
}

let getRequest = browser.storage.local.get("torrents");
getRequest.then(onGet, onError);
