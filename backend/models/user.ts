'use strict';
import {
  Model, 
  DataTypes
} from "sequelize"
import sequelize from "../config/database";  // ✅ Import your Sequelize instance



  class User extends Model {
    id!: number;
    name!: string;
    username!: string;
    email!: string;
    password!: string;
    bio!: string;

    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,      // Use UUID data type
      defaultValue: DataTypes.UUIDV4,  // Auto-generate UUID v4
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    bio: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'User',
  });
;


export default User