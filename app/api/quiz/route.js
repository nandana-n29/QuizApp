import dbConnect from '@/app/middleware/database';
import Quiz from '@/app/models/Quiz';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { quizId, question } = await req.json();
      
      const existingQuiz = await Quiz.findOne({ quizId });
    
      if (existingQuiz) {
        return NextResponse.json({ message: 'Quiz already present' }, { status: 200 });
      }
      // Create a new quiz document
      const newQuiz = new Quiz({
        quizId,
        question
      });
      // Save the quiz to the database
      await newQuiz.save();

      return NextResponse.json({ message: 'Quiz data saved successfully' },{ status: 201 });
    } 
    catch (error) {
      console.error('Error saving quiz data:', error);
      return NextResponse.json({ error: error },{ status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' },{ status: 405 });
  }
}
