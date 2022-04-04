const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  variantList:{
      type: Array,
      required: true
  },
  answer: {
      type: String,
      required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



module.exports = mongoose.model('Question', questionSchema);
