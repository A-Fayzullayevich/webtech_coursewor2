const Question = require("../models/questionModel")

exports.getTest = (req,res)=>{
   res.render('private/createTest',{
       title:"Create Test"
   })
}

exports.getProfile = (req,res)=>{
    Question.find({user_id:req.user._id}).populate('user_id').exec((err,question)=>{
        if(!question){
          return res.redirect('/signin');
       }
        if (err) { return console.error(err); }
        res.render('private/profile',{
            title:"Profile",
            data:question
        })
      })
 }
 

exports.postTest = (req,res)=>{
    const {question,wrong_answer1,wrong_answer2,wrong_answer3,wrong_answer4,answer} = req.body
    const user_id    = req.session.user._id;
    const newQuestion = new Question({
        question,
        variantList:[wrong_answer1,wrong_answer2,wrong_answer3,wrong_answer4],
        answer,
        user_id
      })
    newQuestion.save()
    .then(()=>{
        return res.redirect('/')
    }).catch(err=>{
       console.log(err);
       return res.redirect('/error')
    })  

}

exports.deleteTest = (req, res) => {
    const questionId = req.body.questionId;
    console.log(req.body.questionId);
    Question.findByIdAndRemove(questionId).then(()=>{
       return res.redirect('/admin/profile')
    }).catch(err=>{
        res.redirect('/error')
    })
}

exports.getEditTest = async (req, res) => {
    const id = req.params.questionId;
    console.log(id);
    try {
      await Question.findById(id).populate("user_id").exec((err,question)=>{
        if(!question){
          return res.redirect('/');
       }
       res.render('private/editQuestion', {
        title: 'Edit Question',
        question: question
      })
      })
    } catch (error) {
      console.log(error);
      return res.redirect('/');    
    }
      
  };

  exports.postEditTest = async (req, res) => {
    try {
        const {question,wrong_answer1,wrong_answer2,wrong_answer3,wrong_answer4,answer,questionId} = req.body
    
      const single_question = await Question.findById(questionId);
      if (single_question.user_id.toString() !== req.user._id.toString()) {
       return res.redirect('/');
      }
      single_question.question = question;
      single_question.variantList = [wrong_answer1,wrong_answer2,wrong_answer3,wrong_answer4],
      single_question.answer = answer;
      await single_question.save()
      res.redirect('/admin/profile');
    } catch (error) {
       console.log(error);
       return res.redirect('/error');
    }
  }
    
  