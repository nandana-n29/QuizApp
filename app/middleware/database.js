import { connect } from 'mongoose';
// require('dotenv').config();

const functionn = ()=>{
    console.log("Connect to mongoDB Successfully");
}

const connnectToMongoDB = ()=>{
    connect('mongodb+srv://sudhanshu250403:mongoDBatlas@cluster0.zajcgga.mongodb.net/quiz',functionn())
}
export default connnectToMongoDB;

// const url = mongodb+srv://sudhanshu250403:mongoDBatlas@cluster0.zajcgga.mongodb.net/