import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";

export interface SessionAttributes {
    id?: number;
    userId: number;
    token: string;
}

interface SessionCreationAttributes extends Optional<SessionAttributes, 'id'> { }

class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
    public id!: number;
    public userId!: number;
    public token!: string;
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "Session",
    tableName: "sessions"
})

export default Session;