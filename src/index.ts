import { OrganizeImportsMode } from "typescript";
import {WebSocketServer, WebSocket} from "ws"
import dotenv from "dotenv";
dotenv.config();


// Creating Redis Client
import Redis from "ioredis";

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = Number(process.env.REDIS_PORT) || 6379;

const pub = new Redis(redisPort, redisHost);
const sub = new Redis(redisPort, redisHost);


if (!process.env.PORT) {
  throw new Error("PORT is not defined in environment variables");
}

const wsPORT: number = parseInt(process.env.PORT, 10);

const wss = new WebSocketServer({ port: wsPORT });

let userCount = 0;

// let sck:WebSocket[] = [];

//now the socket should look something like this, use maps and Records here
/* let allSockets = {
    "room1" : [socket1, socket2],
    "123sdr" : [socker3, socket4],
    "43trh" : [socket5, socket6]
} */

let sck:Record<string, WebSocket[]> = {}; 

interface userMessage {
    type : string,
    payload : {
        roomId : string,
        user? : string,
        userId? : string,
        userAvatar? : string,
        message? :string
    }
}

wss.on("connection",function(socket){
    socket.send("WebSocket connection established");
    socket.on("message",(event)=>{
        //event here now is stringified JSON object, having types now check if user wants to chat or join the room
        // check for the message type in JSON Object by unstringifying it
        const userMessage:userMessage = JSON.parse(event.toString());
        if(userMessage.type == "join"){
            let roomId = userMessage.payload.roomId as string;
            // let arr = sck[roomId];
            // sck[roomId] = [...arr, socket];
            if(sck[roomId] == undefined){
                sck[roomId] = [];
            }
            else{
                sck[roomId] = [...sck[roomId]];
            }
            sck[roomId].push(socket)
        }
        else if(userMessage.type == "chat"){
            let roomId = userMessage.payload.roomId as string;
            let arr:WebSocket[] = sck[roomId];
            // console.log(arr);
            
            arr.forEach((childSocket)=>{
                if(!(childSocket==socket)){
                    if(!userMessage.payload?.message){
                        return;
                    }
                    childSocket.send(userMessage.payload?.message);
                }
            })
        }
    })
})
