import Question from "@/app/models/Question";
import { NextResponse} from 'next/server'
import dbConnect from '@/app/middleware/database';


export async function POST(req, res) {
  // Ensure that the database is connected
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Parse the JSON request body
      const requestData = await req.json();

      // Check if the 'questions' array exists in the request body
      if (!requestData.hasOwnProperty('questions')) {
        return NextResponse.json({ error: "Questions array not found in request body" }, { status: 400 });
      }

      // Extract the 'questions' array from the request body
      const questionsData = requestData.questions;

      // Create an array to hold the new question objects
      const newQuestions = [];

      // Iterate over each question data
      questionsData.forEach(questionData => {
        // Extract data for each question
        const { question, answer, options, unit, topic, subject } = questionData;

        // Create a new question object
        const newQuestion = {
          question,
          answer,
          options,
          unit,
          topic,
          subject
        };

        // Push the new question object to the array
        newQuestions.push(newQuestion);
      });

      // Insert all new questions to the database
      await Question.insertMany(newQuestions);

      // Return a success message in the response
      return NextResponse.json({ message: 'Questions added successfully' }, { status: 201 });
    } catch (error) {
      // If an error occurs, return the error in the response
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    // If the request method is not POST, return a method not allowed error
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 500 });
  }
}

