const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email:{
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  province:{
      type: String,
      required: true
  },
  questionList: [
      {
        question_id: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        }
      }
    ]
});



module.exports = mongoose.model('User', userSchema);
