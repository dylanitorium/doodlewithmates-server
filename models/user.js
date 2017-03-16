import mongoose from 'mongoose';

export default mongoose.model('User', new mongoose.Schema({
  name: String,
  picture: String,
  color: String,
  path: {
    xCoordinates: Array,
    yCoordinates: Array,
    dragCoordinates: Array,
  },
  active: Boolean,
}));
