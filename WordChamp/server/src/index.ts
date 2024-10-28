import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wordRouter from './routes/words.routes';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN || '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cors({
  origin: process.env.ORIGIN || '*', 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/words', wordRouter);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
