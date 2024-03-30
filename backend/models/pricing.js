import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Organization from './organization.js';
import Item from './item.js';

const Pricing = sequelize.define('Pricing', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  organizationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Organization,
      key: 'id',
    },
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Item,
      key: 'id',
    },
  },
  zone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  baseDistanceInKm: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
  },
  kmPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fixPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Organization.hasMany(Pricing, { foreignKey: 'organizationId' });
Pricing.belongsTo(Organization, { foreignKey: 'organizationId' });

Item.hasMany(Pricing, { foreignKey: 'itemId' });
Pricing.belongsTo(Item, { foreignKey: 'itemId' });

export default Pricing;