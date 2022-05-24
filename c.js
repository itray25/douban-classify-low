var spawn = require('child_process').spawn,
    server = null;


function startServer(){
    console.log('start server');
    server = spawn('node',['index.js']);
    console.log('node js pid is '+server.pid);
    server.on('close',function(code,signal){
        server = startServer();
    });
    server.on('error',function(code,signal){
        server = startServer();
    });
    return server;
};

startServer();