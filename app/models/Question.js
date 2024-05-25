const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {type: String, required:true},
  answer: {type: String, required:true},
  options: [
    {
      option: {type: String},
      isCorrect: {type :Boolean}
    },
    {
      option: {type: String},
      isCorrect: {type :Boolean}
    },
    {
      option: {type: String},
      isCorrect: {type :Boolean}
    },
    {
      option: {type: String},
      isCorrect: {type :Boolean}
    }
  ],
  difficulty:{type: String, default: "Easy"},
  unit:{type: String, required:true},
  topic:{type: String, required:true},
  subject:{type: String, required:true},
});
mongoose.models = {};
export default mongoose.model("Question",QuestionSchema)
