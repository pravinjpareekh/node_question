'use-strict';
var express    = require('express'); 

module.exports = (app, passport) => {
    const userController = require('../controllers/userController');
    const questionController = require('../controllers/questionController');
    const unprotectedRouter = express.Router();
    const protectedRouter = express.Router();

    unprotectedRouter.post('/register', userController.registerUser);
    unprotectedRouter.post('/login', userController.authenticateUser);
   // app.post('/register', userController.registerUser);

   protectedRouter.route('/questions')
    .get(questionController.getQuestions)
    .post(questionController.addQuestion)

    protectedRouter.route('/questions/category')
    .get(questionController.getQuestionsCategory)

    app.use('/api', unprotectedRouter);
    app.use('/api', passport.authenticate('jwt', { session: false }), protectedRouter);

}