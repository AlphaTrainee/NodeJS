import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const SoldTicket = sequelize.define('SoldTicket', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Erzeugt eine lange, eindeutige ID (perfekt für QR-Codes)
        primaryKey: true
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ticketId: { // Die Verknüpfung zum Original-Ticket
        type: DataTypes.INTEGER,
        allowNull: true // Falls das Ticket gelöscht wird, bleibt der Datensatz erhalten
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
}, {
    // HIER den Namen festlegen:
    tableName: 'ka_sold_tickets',
    timestamps: true,
    freezeTableName: true // Das sorgt dafür, dass Sequelize nicht versucht, ein "s" dranzuhängen
});

export default SoldTicket;