import User from "./Users";
import Session from "./Session";
import Categories from "./Categories";
import Products from "./Products";
import HeroAds from "./HeroAds";


Categories.hasMany(Products, { foreignKey: "categoryId" });
Products.belongsTo(Categories, { foreignKey: "categoryId" });

User.hasMany(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

export { User, Session, Categories, Products, HeroAds };
