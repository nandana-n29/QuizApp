import { NextResponse } from 'next/server';
import dbConnect from '@/app/middleware/database';
import User from '@/app/models/user';

export async function POST(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    try {
      const requestData = await req.json();
      const { identifier, password } = requestData;

      // Find the user by either username or email
      const user = await User.findOne({
        $or: [{ username: identifier }, { email: identifier }]
      });

      if (!user) {
        return NextResponse.json({success:false}, { status: 200 });
      }

      // Check if the password is correct
      if (user.password !== password) {
        return NextResponse.json({ success: false }, { status: 401 });
      }

      return NextResponse.json({ success:true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success:false }, { status: 400 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  } 
}