import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
  name: String,
  gamesCount: Number,
  rating: Number,

  avgRank: Number,
  totalPoints: Number,
  firstRate: Number,
  secondRate: Number,
  thirdRate: Number,
  fourthRate: Number,

  resultHistory: Array,
  rankHistory: Array,
  ratingHistory: Array,
  lastGame: Date
});

export default mongoose.model('user', playerSchema, 'user');
