const mongoose = require('mongoose');
const Question = mongoose.model('Questions');


exports.getQuestions = (req, res) => {
    Question.find({}, function(err, questions) {
        if (err) {
            res.json({ status: 'error', message: err }); 
        } else {
            res.json({ status: 'success', data: questions });
        }
    });
  };

  exports.getQuestionsCategory = (req, res) => {
    Question.find().distinct('category', function(err, categories) {
        if (err) {
            res.json({ status: 'error', message: err }); 
        } else {
            res.json({ status: 'success', data: categories });
        }
    });
  };

  exports.addQuestion = (req, res) => {
      const newQuestion = Question(req.body);
      newQuestion.save((err, qu) =>{
        if (err) {
            res.json({ status: 'error' });
        }
        if(qu){
            res.json({ status: 'status', data: qu });
        }
      })
  }