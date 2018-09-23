import jwt from 'jsonwebtoken';

import User from './model';


const jwtCert = 'shhhhh';

const allUsers = async () => {
  return await User.find();
};

const createUser = async (username, password, email) => {
  try {
    const user = new User({
      username: username,
      email: email,
      password: password
    });
    await user.save();
    return user;
  } catch (e) {
    return null;
  }
};

const authenticateByPassword = async (username, password) => {
  const user = await User.findOne({username});
  if (!user) return null;
  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    return null;
  } else {
    return user;
  }
};

const authenticateByToken = async (token) => {
  try {
    const {username} = jwt.verify(token, jwtCert);
    const user = await User.findOne({username});
    return user;
  } catch (e) {
    return null;
  }
};

const generateToken = (user) => {
  const token = jwt.sign({
    username: user.username
  }, jwtCert);
  return token;
};

export {allUsers, createUser, authenticateByPassword, authenticateByToken, generateToken};