import express from "express";
import { getMessages } from "../repos/messageRepo";
import cors from "cors";

export const app = express();
app.use(cors({ origin: "*" })); 

app.get("/rooms/:roomId/messages", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = await getMessages(roomId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "failed to fetch messages" });
  }
});

app.get("/", async (req, res) => {
  res.status(200).json({message : "health Check passed"})
})