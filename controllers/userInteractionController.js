

const Help=require('../modals/help');
const Feedback=require('../modals/feedback');
const { default: mongoose } = require('mongoose');

exports.postHelp=(req,res,next)=>{

    const help=new Help(
        {
            'userId':new mongoose.Types.ObjectId(req.user.userId),
            'email':req.user.email,
            'query':req.body.query
        }
    );

    help.save().then((response)=>{
        res.json({
            errorMsg:'We will reach out to you. As soon as Possible',
            errorCode:0
        })
    })
    .catch((err)=>{
        console.log(error);
        next(err);
    });

}
exports.postFeedback=(req,res,next)=>{

    const feedback=new Feedback(
        {
            'userId':new mongoose.Types.ObjectId(req.user.userId),
            'email':req.user.email,
            'feedback':req.body.feedback
        }
    );

    feedback.save().then((response)=>{
        res.json({
            errorMsg:'Thank you for the feedback.',
            errorCode:0
        })
    })
    .catch((err)=>{
        console.log(error);
        next(err);
    });

}