import Filter from "@/app/models/Filter";
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
      const data = requestData.questions;
      
      // Create an array to hold the new question objects
      const newFilter = [];

      // Iterate over each question data
      for (const filterData of requestData.questions) {
        // Extract data for each question
        const { unit, subject } = filterData;
      
        // Create a new question object
        const filter = {
          unit,
          subject
        };
      
        // Check if the filter already exists in the database
        const exists = await Filter.findOne({ unit: filter.unit, subject: filter.subject });
      
        // If the filter does not exist, push it to the newFilter array
        if (!exists) {
          newFilter.push(filter);
        }
      }
      
      // Insert all new questions to the database
      await Filter.insertMany(newFilter);

      // Return a success message in the response
      return NextResponse.json({ message: 'Filters added successfully' }, { status: 201 });
    } catch (error) {
      // If an error occurs, return the error in the response
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    // If the request method is not POST, return a method not allowed error
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 500 });
  }
}

