import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";

export interface CustomInquiriesAttributes {
    id: number;
    fullNames: string;
    email: string;
    phone: string;
    projectDescription: string;
    images: string[]
    status: string
}

interface CustomInquiriesCreationAttributes extends Optional<CustomInquiriesAttributes, "id"> { }

class CustomInquiries extends Model<CustomInquiriesAttributes, CustomInquiriesCreationAttributes> implements CustomInquiriesAttributes {
    public id!: number;
    public fullNames!: string;
    public email!: string;
    public phone!: string;
    public projectDescription!: string;
    public images!: string[]
    public status!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

CustomInquiries.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullNames: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    projectDescription: { type: DataTypes.STRING, allowNull: false },
    images: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: "UNRESOLVED" }
}, {
    sequelize: sequelizeInstance,
    modelName: "CustomInquiry",
    tableName: "CustomInquiries",
    timestamps: true
})

export default CustomInquiries