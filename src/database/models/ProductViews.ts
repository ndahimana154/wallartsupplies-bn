import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";
import Products from "./Products";

export interface ProductViewsAttributes {
    id?: number;
    productId: number;
    userId?: number | null;
    ipAddress?: string | null;
    viewedAt?: Date;
}

interface ProductViewsCreationAttributes extends Optional<ProductViewsAttributes, 'id'> { }

class ProductViews extends Model<ProductViewsAttributes, ProductViewsCreationAttributes> implements ProductViewsAttributes {
    public id!: number;
    public productId!: number;
    public userId?: number | null;
    public ipAddress?: string | null;
    public viewedAt?: Date;
}

ProductViews.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    viewedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: sequelizeInstance,
    modelName: 'ProductView',
    tableName: 'product_views',
    timestamps: false,
});

// Use a different association alias than "views" because the Product model
// already has a `views` attribute (integer). Naming the association `views`
// causes a Sequelize naming collision. Use `viewEvents` for the relationship
// which stores detailed view records.
Products.hasMany(ProductViews, { foreignKey: 'productId', as: 'viewEvents' });
ProductViews.belongsTo(Products, { foreignKey: 'productId', as: 'product' });

export default ProductViews;
