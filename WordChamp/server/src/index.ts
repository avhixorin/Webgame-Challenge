import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import wordRouter from './routes/words.routes'; // Adjust the import path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.ORIGIN || '*', 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the wordRouter for all routes under /api/words
app.use('/api/words', wordRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
