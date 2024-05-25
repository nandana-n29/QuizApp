import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';
import User from '@/app/models/user';

export async function POST(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    try {
      const requestData = await req.json();

      const { username, email, password } = requestData;

      // Check if the username or email already exists
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return NextResponse.json({ success: false }, { status: 201 });
      }

      // Create a new user
      const newUser = new User({ username, email, password });
      await newUser.save();

      return NextResponse.json({ success: true }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}
