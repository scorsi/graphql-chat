import {allUsers, createUser, authenticateByPassword, generateToken} from './controller';


const resolvers = {
  Query: {
    users: async () => {
      return await allUsers();
    }
  },
  Mutation: {
    register: async (root, {username, email, password}, context) => {
      const user = await createUser(username, email, password);
      if (user === null) return null;
      return {
        username: user.username,
        email: user.email
      };
    },
    authenticate: async (root, {username, password}, context) => {
      const user = await authenticateByPassword(username, password);
      if (user === null) return null;
      return {
        token: generateToken(user),
        username,
        password
      };
    }
  }
};

export default resolvers;