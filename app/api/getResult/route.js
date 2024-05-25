import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';
import Result from '@/app/models/Result';

export async function POST(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
      try {
          const { quizId, username } = await req.json();

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