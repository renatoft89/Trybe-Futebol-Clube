import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './TeamModel';

class Matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  homeTeam: {
    type: DataTypes.INTEGER,
  },

  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },

  awayTeam: {
    type: DataTypes.INTEGER,
  },

  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },

  inProgress: {
    type: DataTypes.BOOLEAN,
  },

}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { as: 'teamHome', foreignKey: 'home_team' });
Matches.belongsTo(Teams, { as: 'teamAway', foreignKey: 'away_team' });

Teams.hasMany(Matches, { as: 'teamHome', foreignKey: 'home_team' });
Teams.hasMany(Matches, { as: 'teamAway', foreignKey: 'away_team' });

export default Matches;
