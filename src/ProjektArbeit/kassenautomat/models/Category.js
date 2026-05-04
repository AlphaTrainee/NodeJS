import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: { msg: "Der Name darf nicht leer sein." },
      len: {
        args: [3, 50],
        msg: "Der Name muss zwischen 3 und 50 Zeichen lang sein."
      },
      // Hier ist die Korrektur: Wir schreiben die Logik selbst
      isNotOnlyNumbers(value) {
        if (/^\d+$/.test(value)) {
          throw new Error("Der Name darf nicht nur aus Zahlen bestehen.");
        }
      }
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      // Maximale Länge für die Beschreibung (z.B. 255 Zeichen)
      len: {
        args: [0, 255],
        msg: "Die Beschreibung darf maximal 255 Zeichen lang sein."
      }
    }
  },
  visible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  // Tabellenname nach deinem Schema
  tableName: 'ka_categories',
  timestamps: false,
  freezeTableName: true
});

export default Category;