import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";

export interface CategoriesAttributes {
    id: number;
    slug: string;
    name: string;
}

interface CategoriesCreationAttributes extends Optional<CategoriesAttributes, 'id'> { }

class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
    public id!: number;
    public slug!: string;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Categories.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    slug: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: sequelizeInstance,
    modelName: "User",
    tableName: "categories"
});

export default Categories