const User = require("../modals/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUserDetails = (req, res, next) => {
  User.findById(req.user.userId)
    .then((data) => {
      if (!data) {
        return res.json({
          errorCode: 909,
          errorMsg: "The user not found",
        });
      }
      return res.json({
        errorCode: 0,
        errorMsg: "The user details",
        data: data,
      });
    })
    .catch((err) => {
      var e = new Error(err);
      // e.httpStatusCode(500);
      next(e);
    });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      const err = new Error("The email or password is incorrect");
      return next(err);
    }

    bcryptjs
      .compare(req.body.password, data.password)
      .then((doMatch) => {
        if (doMatch) {
          //do some session thing
          const token = jwt.sign(
            {
              email: data.email,
              userId: data._id.toString(),
            },
            "somesupersecretsecret",
            { expiresIn: "1h" }
          );
          res.status(200).json({
            token: token,
            userId: data._id.toString(),
            errorCode: "0",
            errorMsg: "The user has been logged in",
          });
        } else {
          const err = new Error("The email or password is incorrect");
          return next(err);
        }
      })
      .catch((err) => {
        next(err);
      });
  });
};
exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (!data) {
      bcryptjs
        .hash(req.body.password, 12)
        .then((hashPassword) => {
          const newUser = new User({
            email: req.body.email,
            password: hashPassword,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
          });
          return newUser.save();
        })
        .then((data) => {
          return res.json({
            response: data,
            errorMsg: "The user have been created",
          });
        })
        .catch((err) => {
          var e = new Error(err);
          // e.httpStatusCode(500);
          next(e);
        });
    } else {
      const err = new Error("The account on this email already exists");
      next(err);
    }
  });
};

exports.forgotPassword =  (req, res, next) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error("The user is not found");
      }
      const token = crypto.randomBytes(32).toString('hex'); // Generate token
      bcrypt.hash(token, 10).then((hashedvalue)=>[
        user.resetToken = token,
        user.resetLinkExpires= new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        user.save()
      ]); // Hash the token

    })
    .catch((err) => {
      next(err);
    });
  //return res.json({ msg: "You forgot password" });
};

exports.resetPassword = (req, res, next) => {
  return res.json({ msg: "You forgot password" });
};
