var http = require('http')
    , fs   = require('fs')
    , url  = require('url')
    , query = require('querystring')
    //, firebase = require('firebase-admin')
    //, firebaseAcc = require('./private/mtg-planechase-firebase-adminsdk-9mjwm-015249477e.json')
    , port = 8080;


/*firebase.initializeApp({
    credential: firebase.credential.cert(firebaseAcc),
    databaseURL: "https://mtg-planechase.firebaseio.com/",
});
console.log("Initialized firebase admin");*/


var server = http.createServer (function (req, res) {


  switch(req.method){
      case "GET":
        if(req.url === "/"){
            sendFile(res, 'public/html/map.html')
        }
        else if(req.url === "/css/map.css") {
            sendFile(res,'public/css/map.css', 'text/css')
        }
        else if(req.url.includes("/images/")) {
            sendFile(res,'public'+ req.url,'image/jpg/png');
        }
        else if(req.url.includes("/geoJSON/")) {
            sendFile(res,'public'+ req.url,'geojson/json');
        }
        else if(req.url === "/js/map.js") {
            sendFile(res, 'public/js/map.js', 'text/javascript');
        }
        else if(req.url === "/bridgeLayer") {
            var bridgeData = require('./geoJSON/cityknowledge-MERGE_Ponti-export.json');
            console.log(bridgeData[0]);
        }
        else{
            sendFile(res, 'public/index_404.html')
        }

        break;
      case "POST":
        break;
      default:
        break;
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines
// NOTE: this is an ideal place to add your data functionality

function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function(error, content) {
        res.writeHead(200, {'Content-type': contentType})
        res.end(content, 'utf-8')
    })
}