import {allChannels, createChannel, deleteChannel} from './controller';

const resovlers = {
  Query: {
    channels: async () => await allChannels()
  },
  Mutation: {
    createChannel: async (_, {name}, context) => {
      if (context.auth === undefined) return new Error('You must be authenticated to create channels.');
      const {auth: {user}} = context;
      const {username, password} = user;
      const channel = await createChannel(user, name);
      if (channel === null) return null;
      return {
        name: channel.name,
        user: {username, password}
      }
    },
    deleteChannel: async (_, {name}, context) => {
      if (context.auth === undefined) return new Error('You must be authenticated to delete channels.');
      const {auth: {user}} = context;
      const {username, password} = user;
      const channel = await deleteChannel(user, name);
      if (channel === false) return null;
      return {
        name: channel.name,
        user: {username, password}
      }
    }
  }
};

export default resovlers;