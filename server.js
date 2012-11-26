var http = require("http"),
    path = require("path"),
    fs   = require("fs"),
    extensions = {
      ".html" : "text/html",
      ".css"  : "text/css",
      ".js"   : "application/javascript",
      ".png"  : "image/png",
      ".gif"  : "image/gif",
      ".jpg"  : "image/jpeg",
      ".mp3"  : "audio/mpeg3"
    };

http.createServer(function(req, res) {

  var filename  = path.basename(req.url) || "index.html",
      dir       = path.dirname(req.url).substring(1),
      ext       = path.extname(filename),
      localPath = './';

  // console.log(req.url);
  if (extensions[ext]) {
    localPath += (dir ? dir + "/" : "") + filename;
    path.exists(localPath, function(exists) {
      if (exists) {
        getFile(localPath, extensions[ext], res);
      } else {
        console.log("Not found");
        res.writeHead(404);
        res.end();
      }
    });

  } else {
    res.writeHead(404);
    res.end();

  }
}).listen(8001);

function getFile(localPath, mimeType, res) {

  // read the file in and return it, or return a 500 if it can't be read
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Content-Length": contents.length
      });
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });

}
