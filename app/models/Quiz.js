const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    quizId: {type: String, required:true, unique:true},
    question: {type: Object},
});
mongoose.models = {};
export default mongoose.model("Quiz",QuizSchema)
