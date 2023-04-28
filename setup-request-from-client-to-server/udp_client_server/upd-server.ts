import dgram  from 'node:dgram';

// Create a UDP server
const server = dgram.createSocket('udp4');

// Server details
const serverPort = 8080; // replace with your desired port

// Listen for incoming messages
server.on('message', (message, remote) => {
  console.log(`Received message from ${remote.address}:${remote.port}: ${message}`);

  // Send a response
  const response = `Received your message: ${message}`;
  server.send(response, remote.port, remote.address, (error) => {
    if (error) {
      console.error(error);
      server.close();
    } else {
      console.log(`Response sent to ${remote.address}:${remote.port}`);
    }
  });
});

// Start listening on the server port
server.bind(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});