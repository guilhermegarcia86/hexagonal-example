import { v4 as uuidv4 } from 'uuid';
import UserModel from '../../adapters/repository/sequelize/entity/UserModel';
import { User } from '../domain/User';

export class UserService {

  public async createUser(user: User): Promise<User> {

    user.id = uuidv4()

    await UserModel.build({
      id: user.id,
      name: user.name,
      email: user.email
    }).save()

    return user
  }

  public async findAllUsers(): Promise<UserModel[]> {

   return await UserModel.findAll()

  }
}