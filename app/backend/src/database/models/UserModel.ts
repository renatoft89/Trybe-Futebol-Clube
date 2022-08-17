import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  username: {
    type: DataTypes.STRING,
  },

  role: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  password: {
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
