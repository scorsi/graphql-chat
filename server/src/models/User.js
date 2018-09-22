import {composeWithMongoose} from 'graphql-compose-mongoose';
import {TypeComposer, schemaComposer} from 'graphql-compose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    index: {unique: true}
  },
  email: {
    type: String,
    unique: true,
    index: {unique: true}
  },
  hashed_password: {
    type: String,
    default: ''
  },
  createdAt: Date,
  updatedAt: Date
});

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
  });

UserSchema.pre('save', function (next) {
  const user = this;

  const currentDate = new Date();
  if (this.isNew) {
    user.updatedAt = currentDate;
    user.createdAt = currentDate;
  } else {
    user.updatedAt = currentDate;
  }

  if (user._password === undefined) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user._password, salt, function (err, hash) {
      if (err) return next(err);
      user.hashed_password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.hashed_password);
};

const User = mongoose.model('User', UserSchema);

const UserTC = composeWithMongoose(User, {});

UserTC.removeField('password');

UserTC.addResolver({
  kind: 'query',
  name: 'findByUsername',
  args: {
    username: 'String!'
  },
  type: UserTC,
  resolve: async ({args}) => {
    return await User.findOne({username: args.username});
  }
});

// language=GraphQL
const RegisterPayloadTC = TypeComposer.create(`
  type RegisterPayload {
    username: String,
    email: String
  }
`);

UserTC.addResolver({
  kind: 'mutation',
  name: 'register',
  args: {
    username: 'String!',
    email: 'String!',
    password: 'String!'
  },
  type: `${RegisterPayloadTC.getType()}!`,
  resolve: async ({args}) => {
    try {
      await new User({
        username: args.username,
        email: args.email,
        password: args.password
      }).save();
      return {
        username: args.username,
        email: args.email
      }
    } catch (e) {
      return e;
    }
  }
});

// language=GraphQL
const AuthenticatePayloadTC = TypeComposer.create(`
  type AuthenticatePayload {
    token: String!,
    username: String!,
    email: String!
  }
`);

UserTC.addResolver({
  kind: 'mutation',
  name: 'authenticate',
  args: {
    username: 'String!',
    password: 'String!'
  },
  type: `${AuthenticatePayloadTC.getType()}!`,
  resolve: async ({args}) => {
    const user = await User.findOne({username: args.username});
    if (!user) return new Error('User not found');
    const isMatch = user.comparePassword(args.password);
    if (!isMatch) {
      return new Error('User not found');
    } else {
      const token = jwt.sign({
        username: user.username
      }, 'shhhhh');
      return {
        token,
        username: user.username,
        email: user.email
      };
    }
  }
});

schemaComposer.Query.addFields({
  userById: UserTC.getResolver('findById'),
  userByUsername: UserTC.getResolver('findByUsername')
});

schemaComposer.Mutation.addFields({
  authenticate: UserTC.getResolver('authenticate'),
  register: UserTC.getResolver('register')
});

export {User, UserTC};