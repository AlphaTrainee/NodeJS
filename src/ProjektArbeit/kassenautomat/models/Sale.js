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
});

export default Sale;