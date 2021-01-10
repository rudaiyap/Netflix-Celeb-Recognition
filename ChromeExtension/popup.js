async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

function createTable(celebrityData){
    let table = document.createElement('table')
    let tr = table.insertRow(-1);
    let th = document.createElement("th"); 
    th.innerHTML = 'Name';
    tr.appendChild(th);
    th = document.createElement("th"); 
    th.innerHTML = 'URL';
    tr.appendChild(th);
    th = document.createElement("th"); 
    th.innerHTML = 'Confidence';
    tr.appendChild(th);


    let tabCell;
    for(var i = 0; i<celebrityData.length; i++){
        tr = table.insertRow(-1);
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML = celebrityData[i].Name;
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML = celebrityData[i].Urls[0];
        tabCell = tr.insertCell(-1);
        tabCell.innerHTML = celebrityData[i].MatchConfidence;
    }

    return table;
}

console.log('Taking Screenshot')
chrome.tabs.captureVisibleTab(null,function(screenshotData) {
    document.getElementById('target').src = screenshotData;
    let data = screenshotData.replace("data:image/jpeg;base64,","")
    let APIGatewayURL = 'INSERT API GATEWAY URL HERE'
    postData(APIGatewayURL, {imageInBase64 : data})
    .then(data => {
        let recognisedFaces = data.CelebrityFaces;
        let unrecognisedFaces = data.UnrecognizedFaces;
        let recognisedTable = createTable(recognisedFaces);
        let divContainer = document.getElementById('results');
        divContainer.innerHTML = "";
        divContainer.appendChild(recognisedTable);


    });
    
  });