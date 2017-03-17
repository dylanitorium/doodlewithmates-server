import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
  fbid: String,
  name: String,
  picture: String,
  color: String,
  isActive: Boolean,
  path: {
    xCoordinates: Array,
    yCoordinates: Array,
    dragCoordinates: Array,
  },
}));
