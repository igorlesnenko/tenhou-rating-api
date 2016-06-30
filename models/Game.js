import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({

  date: Date, // UTC date
  time: String,
  type: String,
  lobby: String,

  gameStr: String,
  hash: String,

  first: String,
  second: String,
  third: String,
  fourth: String,

  players: Array,
  results: Array,
  ratings: Array,
  ratingChanges: Array,

  firstResult: String,
  secondResult: String,
  thirdResult: String,
  fourthResult: String,

  firstRatingChange: Number,
  secondRatingChange: Number,
  thirdRatingChange: Number,
  fourthRatingChange: Number
});

export default mongoose.model('game', gameSchema, 'game');
