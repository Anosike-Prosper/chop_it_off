import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// Define the Joi schema for URL validation
const urlSchema = Joi.string().uri({
  scheme: ['http', 'https'],
});

// Middleware function for URL validation
export function urlValidatorMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { longurl } = req.body; // Assuming the URL is passed in the request body

  // Validate the URL
  const { error } = urlSchema.validate(longurl);

  if (error) {
    // Handle the validation error
    
    return res.status(400).json({ error: error.details[0].message });
  }
  

  // If URL is valid, continue to the next middleware or route handler
  next();
}
