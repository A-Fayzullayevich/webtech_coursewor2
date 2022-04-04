const Person = require('../models/userModel');
const Question = require('../models/questionModel')
const bcrypt = require('bcryptjs');

exports.getIndex = (req, res) => {
  Question.find().populate('user_id').exec((err,question)=>{
        if (err) { return console.error(err); }
        res.render('public/index', {
          title: 'Question List',
          questions: question
        });
      })
} 

exports.getSignIn = (req, res) => {
  res.render('public/signin',{
    title:'Login'
  })
};

exports.getSignUp = (req, res) => {
  res.render('public/signup',{
    title:'Create an Account'
  })
};

exports.getSingleQuestion = (req, res) => {
  Question.find({_id:req.params.questionId}).populate('user_id').exec((err,question) => {
    if (err) { return console.error(err); }
    res.render('public/detail',{
      title:'Take challenge',
      question:question
    })
  })
}

exports.postSignUp = (req, res) => {
  let {email,password,username,province} = req.body;
  Person.findOne({email})
  .then(person=>{
    if(person){
      return res.redirect('/signup');
    }

    bcrypt.hash(password,8)
    .then(password_hash=>{
      let new_user = new Person({
        email,
        password:password_hash,
        username,
        province,
        questionList:[]
      });
      new_user.save()
      .then(()=>{
        return res.redirect('/signin')
      })
    })
    

  }).catch(err=>{
    console.log(err);
    return res.redirect('/error')
  })
};

exports.postSignIn = (req, res) => {
  let {email,password} = req.body; 
  Person.findOne({email})
  .then(person=>{
    if(!person){
      return res.redirect('/signin')
    }

   bcrypt.compare(password, person.password)
   .then(result=>{
    if(result){
      req.session.user_entered = true;
      req.session.user = person;
      return req.session.save(err => {
        res.redirect('/');
      });
     }
   })

  })
  .catch(err=>{
    console.log(err);
    return res.redirect('/signin')
  })

}

exports.postSignOut = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/');
  });
};



