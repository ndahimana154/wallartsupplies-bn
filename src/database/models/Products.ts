import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";
import Categories from "./Categories";

export interface ProductsAttributes {
    id: number;
    name: string;
    price: number;
    moq: number;
    description: string;
    images: string[];
    customAttr: { key: string; value: string }[];
    slug: string;
    categoryId: number;
    status: boolean
}

interface ProductsCreationAttributes
    extends Optional<ProductsAttributes, "id"> { }

class Products
    extends Model<ProductsAttributes, ProductsCreationAttributes>
    implements ProductsAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public moq!: number;
    public description!: string;
    public images!: string[];
    public customAttr!: { key: string; value: string }[];
    public slug!: string;
    public categoryId!: number;
    public status!: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Products.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        moq: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
            defaultValue: [],
        },
        customAttr: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: true,
            defaultValue: [],
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "categories",
                key: "id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize: sequelizeInstance,
        modelName: "Product",
        tableName: "products",
        timestamps: true,
    }
);

Products.belongsTo(Categories, { foreignKey: "categoryId", as: "category" });

export default Products;
