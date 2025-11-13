import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../config/db";

export interface HeroAdsAttributes {
    id: number;
    title: string;
    description: string;
    image: string;
    buttonText: string;
    link: string;
    isActive: boolean;
}

interface HeroAdsCreationAttributes extends Optional<HeroAdsAttributes, 'id'> { }

class HeroAds extends Model<HeroAdsAttributes, HeroAdsCreationAttributes> implements HeroAdsAttributes {
    public id!: number
    public title!: string
    public description!: string
    public image!: string;
    public buttonText!: string;
    public link!: string;
    public isActive!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

HeroAds.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    buttonText: { type: DataTypes.STRING, allowNull: false },
    link: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
}, {
    sequelize: sequelizeInstance,
    modelName: "HeroAds",
    tableName: "HeroAds"
})

export default HeroAds