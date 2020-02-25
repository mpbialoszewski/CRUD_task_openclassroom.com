//Setting up connection 
const http = require('http');
const app = require('./app');


//normalizePort returns a valid port, whether it is provided as a number or a string
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/*errorHandler - function checks for various errors 
and handles them appropriately — it is then registered to the server*/
const errorHandler = error => {
    //addding event listener -> logging the pipe on which the server is running 
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/*
The listener passed as an argument to createServer() will receive the request and response 
objects as arguments, generally shortened to  req  and  res .  The  next  function only exists
 within an Express app, and the listener does not receive any environment variables as arguments.
*/
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
