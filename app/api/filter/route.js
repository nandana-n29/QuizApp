import Filter from "@/app/models/Filter";
import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';

export async function GET(req, res) {
  // Ensure that the database is connected
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Retrieve filters from the database
      const filters = await Filter.find();

      // Return the filters in the response
      return NextResponse.json(filters, { status: 200 });
    } catch (error) {
      // If an error occurs, return the error in the response
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // If the request method is not GET, return a method not allowed error
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}
