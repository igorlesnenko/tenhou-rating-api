import { MongoDBModel } from 'spikenail';

class Game extends MongoDBModel {}

export default new Game({
  name: 'game',
  providerOptions: {
    collection: 'game',
  },
  properties: {
    id: {
      type: 'id'
    },

    date: {
      type: Date
    },
    time: {
      type: String
    },
    type: {
      type: String
    },
    lobby: {
      type: String
    },

    gameStr: {
      type: String
    },
    hash: {
      type: String
    },

    first: {
      type: String
    },
    second: {
      type: String
    },
    third: {
      type: String
    },
    fourth: {
      type: String
    },

    players: {
      type: Array
    },
    results: {
      type: Array
    },
    ratings: {
      type: Array
    },
    ratingChanges: {
      type: Array
    },

    firstResult: {
      type: String
    },
    secondResult: {
      type: String
    },
    thirdResult: {
      type: String
    },
    fourthResult: {
      type: String
    },

    firstRatingChange: {
      type: Number
    },
    secondRatingChange: {
      type: Number
    },
    thirdRatingChange: {
      type: Number
    },
    fourthRatingChange: {
      type: Number
    }
  },
  acls: [{
    allow: false
  }, {
    allow: true,
    actions: ['read']
  }]
});