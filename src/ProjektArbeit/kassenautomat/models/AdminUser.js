import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';
import bcrypt from 'bcrypt';

const AdminUser = sequelize.define('AdminUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "Benutzername darf nicht leer sein." },
            len: {
                args: [3, 20],
                msg: "Der Benutzername muss zwischen 3 und 20 Zeichen lang sein."
            },
            // Verhindert Sonderzeichen, erlaubt nur Buchstaben und Zahlen
            isAlphanumeric: {
                msg: "Der Benutzername darf nur aus Buchstaben und Zahlen bestehen."
            }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Passwort darf nicht leer sein." },
            // Erzwingt eine Mindestlänge vor dem Hashing
            len: {
                args: [6, 100],
                msg: "Das Passwort muss mindestens 6 Zeichen lang sein."
            }
        }
    }
}, {
    tableName: 'ka_users',
    timestamps: false,
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

export default AdminUser;