import mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: {unique: true}
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Channel = mongoose.model('Channel', ChannelSchema);

export default Channel;