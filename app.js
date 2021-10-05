const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const index_page = fs.readFileSync('./index.ejs', 'utf-8');
const other_page = fs.readFileSync('./other.ejs', 'utf-8');
const style_css = fs.readFileSync('./style.css', 'utf-8');

const server = http.createServer(getFromClient);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//from here is main program.

function getFromClient(request, response) {
  var url_parts = url.parse(request.url, true);

  switch (url_parts.pathname) {
    case '/':
      response_index(request, response);
      break;

    case '/other':
      response_other(request, response);
      break;

    case '/style.css':
      response.writeHead(200, { 'content-Type': 'text/css' });
      response.write(style_css);
      response.end();
      break;

    default:
      response.writeHead(200, { 'content-Type': 'text/plain' });
      response.write('no page...');
      response.end();
      break;
  }

}

function response_index(request, response) {
  var content = 'This Page is IndexPage.';
  var query = url_parts.query;
  if (query != undefined) {
    content += ' ' + query.msg + 'is sended.';
  }
  var contents = ejs.render(index_page, {
    title: "Titlepage",
    content: content,
  });
  response.writeHead(200, { 'content-Type': 'text/html' });
  response.write(contents);
  response.end();
}

function response_other(request, response) {
  var msg = "This page is OtherPage.";
  //At Post request
  if (request.method == 'POST') {
    var body = '';
  }
  var content = ejs.render(other_page, {
    title: "OtherPage",
    content: "This page is otherpage that uses ejs!"
  });
  response.writeHead(200, { 'content-Type': 'text/html' });
  response.write(content);
  response.end();
}