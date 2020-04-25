const http = require('http');

function vratiSveKnjige(){
    const options = {
        hostname: "localhost",
        port: "200",
        path: encodeURI('/sve-knjige'),
        method: "GET"
    };

    function handleResponse(response){
        var serverData = '';
        response.on('data',function(chunk){
            serverData += chunk;
        });
        response.on('end',function(){
            console.log(JSON.parse(serverData));
        });
    }
    http.request(options,function(response){
        handleResponse(response);
    }).end();
}
vratiSveKnjige();

function dodajKnjigu(id,naziv,autor){
    var options = {
        host: "127.0.0.1",
        port: "200",
        path: encodeURI('/add-knjiga'),
        method: "POST"
    }

    function handleResponse(response){
        var responseData = ' ';
        response.on('data',function(chunk){
            responseData += chunk;
        });
        response.on('end',function(){
            console.log("Primljeno: " + responseData);
        });
    }
    var http = require('http');
    var req = http.request(options,handleResponse);
    req.write('id=' + id + '&naziv=' + naziv + '&autor=' + autor);
    req.end();
}
dodajKnjigu(6,'Knjiga 6','Autor 6');

function vratiKnjigu(id){
    var options = {
        host: "127.0.0.1",
        port: "200",
        path: encodeURI('/get-knjiga'),
        method: "POST"
    }

    function handleResponse(response){
        var responseData = ' ';
        response.on('data',function(chunk){
            responseData += chunk;
        });
        response.on('end',function(){
            console.log("Primljeno: " + responseData);
        });
    }
    var http = require('http');
    var req = http.request(options,handleResponse);
    req.write('id=' + id);
    req.end();
}
vratiKnjigu(4);

function vratiKnjiguByAuthor(autor){
    var options = {
        host: "127.0.0.1",
        port: "200",
        path: encodeURI('/get-knjiga-by-author'),
        method: "POST"
    }

    function handleResponse(response){
        var responseData = ' ';
        response.on('data',function(chunk){
            responseData += chunk;
        });
        response.on('end',function(){
            console.log("Primljeno: " + responseData);
        });
    }
    var http = require('http');
    var req = http.request(options,handleResponse);
    req.write('autor=' + autor);
    req.end();
}
vratiKnjiguByAuthor("Autor 2");

function postaviAutora(naziv,autor){
    var options = {
        host: "127.0.0.1",
        port: "200",
        path: encodeURI('/set-author'),
        method: "POST"
    }

    function handleResponse(response){
        var responseData = ' ';
        response.on('data',function(chunk){
            responseData += chunk;
        });
        response.on('end',function(){
            console.log("Primljeno: " + responseData);
        });
    }
    var http = require('http');
    var req = http.request(options,handleResponse);
    req.write('naziv=' + naziv + '&autor=' + autor);
    req.end();
}
postaviAutora("Knjiga 3","Autor 9");

function deleteKnjiga(id){
    var options = {
        host: "127.0.0.1",
        port: "200",
        path: encodeURI('/delete-knjiga'),
        method: "POST"
    }

    function handleResponse(response){
        var responseData = ' ';
        response.on('data',function(chunk){
            responseData += chunk;
        });
        response.on('end',function(){
            console.log("Primljeno: " + responseData);
        });
    }
    var http = require('http');
    var req = http.request(options,handleResponse);
    req.write('id=' + id);
    req.end();
}
deleteKnjiga(4);