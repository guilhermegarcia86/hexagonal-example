import { CreationOptional, DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../connect"

type UserAttributes = {
  id: string
  name: string
  email: string
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  public id: CreationOptional<string>
  public name: string
  public email: string
}

UserModel.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'UserModel',
  tableName: 'User'
})

export default UserModel