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
      type: 'Float'
    },
    lobby: {
      type: String
    },

    avgRank: {
      type: 'Float'
    },
    totalPoints: {
      type: Number
    },

    firstRate: {
      type: 'Float'
    },
    secondRate: {
      type: 'Float'
    },
    thirdRate: {
      type: 'Float'
    },
    fourthRate: {
      type: 'Float'
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
      getCondition: function(_) {
        let names = _.map(i => i.name);
        return { players: { '$in': names } }
      }
    }
  },
  acls: [{
    allow: false
  }, {
    allow: true,
    actions: ['read']
  }]
});