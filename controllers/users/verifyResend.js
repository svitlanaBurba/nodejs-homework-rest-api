const {users: service} = require('../../services');

const verifyResend = async (req, res, next) => {
  try {
    const {email} = req.body;

    if (!email) {
      res.json({
        status: 'error',
        code: 400,
        data: {message: 'missing required field email'}
      });
      return;
    }
    const user = await service.getByEmail(email);

    if (!user) {
      res.json({
        status: 'error',
        code: 400,
        data: {message: 'user with this email is not found'}
      });
      return;
    }

    if (user.verify) {
      res.json({
        status: 'error',
        code: 400,
        data: {message: 'Verification has already been passed'}
      });
      return;
    }

    const result = await service.sendVerifyEmail(email, user.verifyToken);
    res.json({
      status: 'success',
      code: 200,
      data: {message: 'Verification email sent'}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyResend;
