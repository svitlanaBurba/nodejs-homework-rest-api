const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateSubscription = require('./updateSubscription');
const uploadUpdateAvatar = require('./uploadUpdateAvatar');

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  uploadUpdateAvatar
};
