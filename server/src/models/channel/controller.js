import Channel from './model';


const allChannels = async () => {
  return await Channel.find();
};

const createChannel = async (user, channelName) => {
  try {
    const channel = new Channel({
      user: user._id,
      name: channelName
    });
    await channel.save();
    return channel;
  } catch (e) {
    return null;
  }
};

const deleteChannel = async (user, channelName) => {
  const channel = await Channel.findOne({
    user: user._id,
    name: channelName
  });
  try {
    if (channel) {
      await Channel.deleteOne({name: channelName});
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export {allChannels, createChannel, deleteChannel};