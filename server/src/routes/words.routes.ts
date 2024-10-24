import { Router, Request, Response } from 'express';
import { easyWords, godWords, hardWords, mediumWords } from '../constants/words';
import ApiResponse from "../utils/ApiResponse/ApiResponse"
import ApiError from '../utils/ApiError/ApiError';

const wordRouter = Router();

wordRouter.get('/getWords/:noOfWords/:queryWordLength/:difficulty', (req: Request, res: Response) => {
  const { noOfWords, queryWordLength, difficulty } = req.params;
  
  let words: string[] = [];

  const wordLength = parseInt(queryWordLength, 10);
  const wordCount = parseInt(noOfWords, 10);

  // Validate the query parameters
  if (isNaN(wordLength) || isNaN(wordCount) || wordLength < 3 || wordLength > 7) {
    throw new ApiError(400, 'Invalid word length or number of words requested.');
  }

  // Filter words based on difficulty level
  if (difficulty === "easy") {
    words = easyWords.filter((word) => word.length === wordLength);
  } else if (difficulty === "medium") {
    words = mediumWords.filter((word) => word.length === wordLength);
  } else if (difficulty === "hard") {
    words = hardWords.filter((word) => word.length === wordLength);
  } else if (difficulty === "god") {
    words = godWords.filter((word) => word.length === wordLength);
  } else {
    throw new ApiError(400, 'Invalid difficulty level.');
  }

  // Limit the number of words returned
  const limitedWords = words.slice(0, wordCount);

  // Log information for debugging purposes
  console.log("Number of words requested: ", noOfWords);
  console.log("Length of words requested: ", queryWordLength);
  console.log("Difficulty: ", difficulty);
  console.log("Filtered words: ", limitedWords);

  // Respond with the words or a message if none are found
  if (limitedWords.length === 0) {
    res.json(new ApiResponse(404, 'No words found matching your criteria.'));
  } else {
    res.json(new ApiResponse(200, 'Words retrieved successfully.', limitedWords));
  }
});

export default wordRouter;
