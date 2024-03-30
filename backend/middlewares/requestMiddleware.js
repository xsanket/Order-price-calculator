import express from 'express';

const requestMiddleware = express.Router();

// json conversion
requestMiddleware.use(express.json());



export default requestMiddleware;