import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Ticket = sequelize.define('Ticket', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Der Ticketname darf nicht leer sein." },
      len: {
        args: [2, 100],
        msg: "Der Name muss zwischen 2 und 100 Zeichen lang sein."
      }
    }
  },
  preis: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: "Der Preis muss eine gültige Zahl sein." },
      min: {
        args: [0],
        msg: "Der Preis darf nicht negativ sein."
      }
    }
  },
  kategorie: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: { msg: "Die Kategorie-ID muss eine Ganzzahl sein." },
      min: {
        args: [1],
        msg: "Ungültige Kategorie-ID."
      }
    }
  }
}, {
  // HIER den Namen festlegen:
  tableName: 'ka_tickets',
  timestamps: false,
  freezeTableName: true // Das sorgt dafür, dass Sequelize nicht versucht, ein "s" dranzuhängen
});

export default Ticket;