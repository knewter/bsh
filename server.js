var http   = require("http"),
    path   = require("path"),
    fs     = require("fs"),
    sass   = require("node-sass"),
    port   = 8001,
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
      } else if(localPath === "./assets/stylesheets/style.css") {
        // Handle the styles with sass
        fs.readFile("./assets/stylesheets/style.scss", function(err, contents) {
          if(!err) {
            sass.render(contents, function(err, css){
              if (!err){
                write200(res, "text/css", css);
              } else {
                write500(res);
              }
            });
          } else {
            write500(res);
          }
        });
      } else {
        console.log("Not found");
        write404(res);
      }
    });
  } else {
    write404(res);
  }
}).listen(port);

console.log("listening at port " + port);

function getFile(localPath, mimeType, res) {
  // read the file in and return it, or return a 500 if it can't be read
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      write200(res, mimeType, contents);
    } else {
      write500(res);
    }
  });
};

function write200(res, mimeType, contents){
  res.writeHead(200, {
    "Content-Type": mimeType,
    "Content-Length": contents.length
  });
  res.end(contents);
};

function write500(res) {
  res.writeHead(500);
  res.end();
};

function write404(res) {
  res.writeHead(404);
  res.end();
};
