import dotenv from "dotenv";
dotenv.config();

import http from "http";
import {app} from "./http/server"
import { createWSServer } from "./ws/wsServer";

const PORT = Number(process.env.PORT) || 8000;

// create ONE http server
const server = http.createServer(app);

// attach websocket to same server
createWSServer(server);

// start server
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});