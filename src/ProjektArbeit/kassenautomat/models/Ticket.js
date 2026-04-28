import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Ticket = sequelize.define('Ticket', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preis: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  kategorie: {
    type: DataTypes.STRING,
    defaultValue: 'Standard'
  }
}, {
  // HIER den Namen festlegen:
  tableName: 'ka_tickets', 
  timestamps: false,
  freezeTableName: true // Das sorgt dafür, dass Sequelize nicht versucht, ein "s" dranzuhängen
});

export default Ticket;