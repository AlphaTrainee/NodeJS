import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Sale = sequelize.define('Sale', {
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false // 'card', 'cash', etc.
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'completed'
    }
}, {
  // HIER den Namen festlegen:
  tableName: 'ka_sales',
  timestamps: true,
  freezeTableName: true // Das sorgt dafür, dass Sequelize nicht versucht, ein "s" dranzuhängen
});

export default Sale;