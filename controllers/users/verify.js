const {users: service} = require('../../services');

const verify = async (req, res, next) => {
  try {
    const {verifyToken} = req.params;
    const user = await service.getByEmailToken(verifyToken);

    if (!user) {
      res.json({
        status: 'error',
        code: 404,
        data: {
          message: 'User not found'
        }
      });
    } else {
      const result = await service.update(user._id, {verify: true});

      res.json({
        status: 'success',
        code: 200,
        data: {
          message: 'Verification succesfull'
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verify;
