const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    quizId: {type: String, required:true, unique:true},
    username: {type: String, required:true},
    questions: {type: Object},
    userAnswers: {type: Object},
});
mongoose.models = {};
export default mongoose.model("Result",ResultSchema)
