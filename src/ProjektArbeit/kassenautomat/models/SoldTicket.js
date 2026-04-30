import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const SoldTicket = sequelize.define('SoldTicket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Erzeugt eine lange, eindeutige ID (perfekt für QR-Codes)
        primaryKey: true
    },
    ticketName: {
        type: DataTypes.STRING, // Wir speichern den Namen redundant, falls das Original-Ticket gelöscht wird
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    usedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

export default SoldTicket;