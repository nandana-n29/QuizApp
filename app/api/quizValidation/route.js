import dbConnect from '@/app/middleware/database';
import Quiz from '@/app/models/Quiz';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { quizId } = await req.json();
      
      const existingQuiz = await Quiz.findOne({ quizId });
    
      if (existingQuiz) {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      return NextResponse.json({ success: false },{ status: 201 });
    } 
    catch (error) {
      console.error('Error saving quiz data:', error);
      return NextResponse.json({ error: error },{ status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' },{ status: 405 });
  }
}
