const http = require('http');
const url = require('url');
const fs = require('fs');
const filename = 'knjige.json';
const queryString = require('querystring');

const server = http.createServer(function(request, response){
    let urlObj = url.parse(request.url,true,false);
    if(request.method == 'GET'){
        if(urlObj.pathname == '/sve-knjige'){
            fs.readFile(filename,function(err,data){
                if(err){
                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                }
                response.writeHead(200);
                response.end(data);
            });
        }
    }
    else if(request.method == 'POST'){
        if(urlObj.pathname == '/add-knjiga'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                let knjige = JSON.parse(fs.readFileSync(filename,function(err,data){
                    if(err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }));
                let knjiga = {
                    "id": parseInt(queryString.parse(body).id),
                    "naziv": queryString.parse(body).naziv,
                    "autor": queryString.parse(body).autor
                }
                knjige.push(knjiga);
                fs.writeFileSync(filename,JSON.stringify(knjige));
            });
            response.writeHead(200);
            response.end('true');
        }

        if(urlObj.pathname == '/get-knjiga'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                let knjige = JSON.parse(fs.readFileSync(filename,function(err,data){
                    if(err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }));
                let id = parseInt(queryString.parse(body).id);
                let retValue = {};
                knjige.forEach(element => {
                    if(element.id == id){
                        retValue = element;
                    }
                });
                response.writeHead(200);
                response.end(JSON.stringify(retValue));
            });
        }

        if(urlObj.pathname == '/get-knjiga-by-author'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                let knjige = JSON.parse(fs.readFileSync(filename,function(err,data){
                    if(err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }));
                let autor = queryString.parse(body).autor;
                let retValue = {};
                knjige.forEach(element => {
                    if(element.autor == autor){
                        retValue = element;
                    }
                });
                response.writeHead(200);
                response.end(JSON.stringify(retValue));
            });
        }

        if(urlObj.pathname == '/set-author'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                let knjige = JSON.parse(fs.readFileSync(filename,function(err,data){
                    if(err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }));               
                let naziv = queryString.parse(body).naziv;
                let autor = queryString.parse(body).autor;
                let retValue = {};
                knjige.forEach(element => {
                    if(element.naziv == naziv){
                        element.autor = autor;
                        retValue = element;
                    }
                });
                fs.writeFileSync(filename,JSON.stringify(knjige));
                response.writeHead(200);
                response.end(JSON.stringify(retValue));
            });
        }

        if(urlObj.pathname == '/delete-knjiga'){
            var body = '';
            request.on('data',function(data){
                body += data;
            });
            request.on('end',function(){
                let knjige = JSON.parse(fs.readFileSync(filename,function(err,data){
                    if(err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }));
                let id = parseInt(queryString.parse(body).id);
                let retValue = {};
                knjige.forEach(element => {
                    if(element.id == id){
                        retValue = element;
                        knjige.splice(knjige.findIndex(element => element.id == id),1);
                    }
                });
                fs.writeFileSync(filename,JSON.stringify(knjige));
                response.writeHead(200);
                response.end(JSON.stringify(retValue));
            });
        }
    }
});
const port = 200;
const host = '127.0.0.1';
server.listen(port,host);
console.log(`Server radi na adresi: http://${host}:${port}`);
