const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
  unit:{type: String, required:true, unique:true},
  subject:{type: String, required:true},
});
mongoose.models = {};
export default mongoose.model("Filter",FilterSchema)
