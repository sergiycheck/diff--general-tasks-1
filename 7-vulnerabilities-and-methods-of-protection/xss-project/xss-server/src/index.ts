import { RawData, WebSocket, WebSocketServer } from "ws";
import http from "http";
import { v4 as uuidv4 } from "uuid";

const server = http.createServer();
const wss = new WebSocketServer({ server });
const port = 8000;
server.listen(port, () => {
  console.log("Websocket server is running on port", port);
});

const clients = new Map<string, WebSocket>();
const users = {};
const editorContentArr = [];

wss.on("connection", function connection(ws, req) {
  ws.on("error", console.error);

  const userId = uuidv4();
  console.log(`Recieved a new connection.`);
  clients[userId] = ws;
  console.log(`${userId} connected.`);

  ws.on("message", (message) => handleMessage(message, userId));
  ws.on("close", () => handleDisconnect(userId));
});

function broadcastMessage(message: { type: string; data: any }) {
  const data = JSON.stringify(message);
  for (let userId in clients) {
    let client = clients[userId] as WebSocket;
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
};
let userActivity = [];

function handleMessage(message: RawData, userId: string) {
  const dataFromClient = JSON.parse(message.toString()) as {
    username: string;
    type: string;
    content: string;
  };

  console.log("Received new data from the client", dataFromClient);

  const json = { type: dataFromClient.type } as { type: string; data: any };

  if (dataFromClient.type === typesDef.USER_EVENT) {
    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined to edit the document`);
    json.data = { users, userActivity, editorContentArr };
  } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
    editorContentArr.push(dataFromClient.content);
    json.data = { editorContentArr, userActivity };
  }

  broadcastMessage(json);
}

function handleDisconnect(userId: string) {
  console.log(`${userId} disconnected.`);

  const json = { type: typesDef.USER_EVENT } as { type: string; data: any };
  const username = users[userId]?.username || userId;

  userActivity.push(`${username} left the document`);

  json.data = { users, userActivity };
  delete clients[userId];
  delete users[userId];

  broadcastMessage(json);
}
