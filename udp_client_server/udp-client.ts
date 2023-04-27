import dgram from "node:dgram";

// Create a UDP socket
const client = dgram.createSocket("udp4");

// Message to send
const message = "Hello UDP Server!";

// Server details
const serverHost = "127.0.0.1"; // replace with your server IP
const serverPort = 8080; // replace with your server port

// Send the message
client.send(message, serverPort, serverHost, (error) => {
  if (error) {
    console.error(error);
    client.close();
  } else {
    console.log("Message sent successfully");
    // close the client after sending the message
    client.close();
  }
});
