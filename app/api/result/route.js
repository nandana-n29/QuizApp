import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';
import Result from '@/app/models/Result';

export async function POST(req, res) {
    await dbConnect();
    if (req.method === 'POST') {
        try {
          const { quizId, username, questions, userAnswers } = await req.json();
    
          // Check if the quiz result already exists
          const existingResult = await Result.findOne({ quizId });
    
          if (existingResult) {
            // Update the existing quiz result
            existingResult.username = username;
            existingResult.questions = questions;
            existingResult.userAnswers = userAnswers;
            await existingResult.save();
            return NextResponse.json({ message: 'Quiz Result updated successfully' }, { status: 200 });
          }
    
          // Create a new quiz result
          const newResult = new Result({
            quizId,
            username,
            questions,
            userAnswers
          });
    
          // Save the quiz result to the database
          await newResult.save();
    
          return NextResponse.json({ message: 'Quiz Result stored successfully' }, { status: 201 });
        } catch (error) {
          console.error('Error storing quiz result:', error);
          return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
      }
    else {
      return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    } 
}

export async function GET(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
      try {
          const { quizId, username } = req.query;

          // Find the quiz result based on the quiz ID and username
          const quizResult = await Result.findOne({ quizId, username });

          if (!quizResult) {
              return NextResponse.json({ message: 'Quiz result not found' }, { status: 404 });
          }

          return NextResponse.json({ quizResult }, { status: 200 });
      } catch (error) {
          console.error('Error fetching quiz result:', error);
          return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
      }
  } else {
      return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}