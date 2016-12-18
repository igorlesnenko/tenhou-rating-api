var graphql = require('graphql');

import Game from './models/Game';
import Player from './models/Player';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  cursorForObjectInConnection,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  toGlobalId,
} from 'graphql-relay';

const defaultArgs = {
  limit: {
    name: 'Limit',
    type: graphql.GraphQLInt
  },
  sort: {
    name: 'Sort',
    type: graphql.GraphQLString
  },
  order: {
    name: 'Order',
    type: graphql.GraphQLInt
  }
};

let playersArgs = {
  limit: {
    name: 'Limit',
    type: graphql.GraphQLInt
  },
  sort: {
    name: 'Sort',
    type: graphql.GraphQLString
  },
  order: {
    name: 'Order',
    type: graphql.GraphQLInt
  },
  name: {
    name: 'Name',
    type: graphql.GraphQLString
  }
};

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    let {type, id} = fromGlobalId(globalId);
    console.log('nodedef - ', type, id);
    if (type === 'Game') {
      return Game.findById(id);
    } else if (type === 'Player') {
      return Player.findById(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof Game) {
      return GameType;
    } else if (obj instanceof Player) {
      return PlayerType;
    } else {
      return null;
    }
  }
);

// TODO: cond is fixed
const defaultResolve = (model, cond = {}) => (root, args, ctx, { fieldASTs }) => {
  return new Promise(function (resolve, reject) {
    // Quick fix for players querying
    if (args.name) {
      cond.name = args.name;
    }

    model.find(cond, (err, items)=> {
      if (err) {
        return reject(err);
      }
      resolve(items);
    }).limit(args.limit).sort({ [args.sort || '_id' ]: args.order || -1 })
  });
};

const GameType = new graphql.GraphQLObjectType({
  name: 'game',
  fields: () => ({
    id: globalIdField('Game'),
    date: {
      type: graphql.GraphQLString
    },
    first: {
      type: graphql.GraphQLString
    },
    second: {
      type: graphql.GraphQLString
    },
    third: {
      type: graphql.GraphQLString
    },
    fourth: {
      type: graphql.GraphQLString
    }
  }),
  interfaces: [nodeInterface]
});

let PlayerType = new graphql.GraphQLObjectType({
  name: 'player',
  fields: function() {
    return {
      id: globalIdField('Player'),
      name: {
        type: graphql.GraphQLString
      },
      gamesCount: {
        type: graphql.GraphQLInt
      },
      rating: {
        type: graphql.GraphQLInt
      },
      resultHistory: {
        type: new graphql.GraphQLList(graphql.GraphQLString)
      },
      rankHistory: {
        type: new graphql.GraphQLList(graphql.GraphQLInt)
      },
      ratingHistory: {
        type: new graphql.GraphQLList(graphql.GraphQLFloat)
      },
      lastGame: {
        type: graphql.GraphQLString
      },
      avgRank: {
        type: graphql.GraphQLFloat
      },
      totalPoints: {
        type: graphql.GraphQLInt
      },
      firstRate: {
        type: graphql.GraphQLFloat
      },
      secondRate: {
        type: graphql.GraphQLFloat
      },
      thirdRate: {
        type: graphql.GraphQLFloat
      },
      fourthRate: {
        type: graphql.GraphQLFloat
      },
      games: {
        type: new graphql.GraphQLList(GameType),
        args: defaultArgs,
        resolve: function(player, args, ctx, { fieldASTs }) {
          return defaultResolve(Game, { players: player.name })(...arguments);
        }
      }
    }
  },
  interfaces: [nodeInterface]
});

const RootQuery = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    players: {
      type: new graphql.GraphQLList(PlayerType),
      args: playersArgs,
      resolve: function(player, args, ctx, { fieldASTs }) {
        return defaultResolve(Player)(...arguments);
      }
    },
    games: {
      type: new graphql.GraphQLList(GameType),
      args: defaultArgs,
      resolve: function(player, args, ctx, { fieldASTs }) {
        return defaultResolve(Game)(...arguments);
      }
    }
  })
});


export default new graphql.GraphQLSchema({
  query: RootQuery
});
