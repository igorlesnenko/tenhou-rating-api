import { MongoDBModel } from 'spikenail';

class Player extends MongoDBModel {}

export default new Player({
  name: 'player',
  providerOptions: {
    collection: 'user'
  },
  properties: {
    id: {
      type: 'id'
    },
    name: {
      type: String
    },
    gamesCount: {
      type: Number
    },
    rating: {
      type: Number
    },
    lobby: {
      type: String
    },

    avgRank: {
      type: Number
    },
    totalPoints: {
      type: Number
    },

    firstRate: {
      type: Number
    },
    secondRate: {
      type: Number
    },
    thirdRate: {
      type: Number
    },
    fourthRate: {
      type: Number
    },

    resultHistory: {
      type: Array
    },
    rankHistory: {
      type: Array
    },
    ratingHistory: {
      type: Array
    },
    lastGame: {
      type: Date
    },
    games: {
      relation: 'hasMany',
      ref: 'game',
      dependsOn: ['name'],
      getConditions: function(_) {
        return { players: _.name }
      }
    }
  }
});