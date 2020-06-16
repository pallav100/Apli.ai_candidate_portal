var http = require('http');
var fs = require('fs');
var path = require('path');
var qs  = require('querystring');

var d;
function get_candidate_data () {
  fs.copyFile('./public/resources/candidate_data.json', './public/resources/updated_candidate_data.json', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');});
}
function update_data(obj){
   // var y=0;
    reqPath = path.join(__dirname,"public","resources","updated_candidate_data.json");
    if(fs.existsSync(reqPath) === false){
      console.log("called");
      get_candidate_data();
}// console.log('no');
     var rawdata = fs.readFile(reqPath , 'utf8', function (err, data) {
        //Handle Error
       if(!err) {
          var jsonObj = JSON.parse(data);
          set(jsonObj,obj);
         //Send back as Response
          // res.end('ok');
        }
   });
}

function set(data,obj){
d = data;
console.log(obj.cooment);
d.response[parseInt(obj.ques_no)-1].grade= parseInt(obj.rating);
d.response[parseInt(obj.ques_no)-1].comment = obj.comment;
var updated_d= JSON.stringify(d, null, 2)
reqPath = path.join(__dirname,"public/resources","updated_candidate_data.json");
console.log(updated_d);
fs.writeFileSync(reqPath, updated_d, (err) => {
    if (err) {
      console.error(err)
      throw err
    }
    
  });

}
var server = http.createServer(function(req,res){
  console.log('req');
  var file;
  switch (req.url) {
        case '/':
            file = 'index.html';
            break;
        case '/result':
            file = 'result.html';
            break;
        default:
            file = req.url;
          }
  let filePath = path.join(
        __dirname,
        "public",
        file
    );

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    console.log(`File path: ${filePath}`);
    console.log(`Content-Type: ${contentType}`)
    res.writeHead(200, {'Content-Type': contentType});
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        console.log('favicon requested');
        return;
      }
    // if (req.url === '/result'&& req.headers['content-type'] ==="text/html") {
    //   filepath = path.join(
    //     __dirname,
    //     "public",
    //     "result.html");
    //     const readStream = fs.createReadStream(filePath);
    //     readStream.pipe(res);
    //     // res.writeHead(200, {'Content-Type': 'text/html'} );
    //     // res.end();
    //     // console.log('favicon requested');
    //     // return;
    //   }
    if(req.url ==='/' && req.headers['content-type'] ==="application/json") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(JSON.parse(body));
            update_data(JSON.parse(body));
            // console.log(d)
            res.end('ok');

        });
          
    }
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    // res.writeHead(200,{'content-Type':contentType})
});
//
// console.log(d);
// var tools = require('./public/index');
// console.log(typeof tools.save_grade); // => 'function'
// console.log(typeof tools.ques_fill);
var port = 3000;
server.listen(process.env.PORT|| port);
console.log('running');
