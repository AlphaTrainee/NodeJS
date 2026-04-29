import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Kategorie = sequelize.define('Kategorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Tabellenname nach deinem Schema
  tableName: 'ka_categories', 
  timestamps: false,
  freezeTableName: true 
});

export default Kategorie;