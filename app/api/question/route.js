import Question from "@/app/models/Question";
import Quiz from "@/app/models/Quiz";
import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';

export async function POST(req, res) {
  await dbConnect();
  try {
    const requestData = await req.json();
    const { subject, unit, difficulty, ques } = requestData;

    console.log("Request Data:", requestData);

    // Check if quiz with the same quizId exists
    const existingQuiz = await Quiz.findOne({ quizId: requestData.quizId });
    if (existingQuiz) {
      return NextResponse.json(existingQuiz, { status: 200 });
    } else {
      // Construct aggregation pipeline based on subject, unit, topic, and difficulty
      const pipeline = [
        { $match: { subject: subject, unit: unit, difficulty: difficulty } },
        { $sample: { size: parseInt(ques) } }
      ];

      // Execute aggregation pipeline
      const questions = await Question.aggregate(pipeline);

      console.log("Sampled Questions:", questions);

      // Return sampled questions
      return NextResponse.json( {question:questions} , { status: 200 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
