import UserModel from '../../adapters/repository/sequelize/entity/UserModel';
import { User } from '../domain/User';
import { UserService } from './UserService'


describe('UserService', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('Should create a User', async () => {

    const user = new User()
    user.id = '123'
    user.name = 'Guilherme'
    user.email = 'teste@teste'

    const saveMock = { save: jest.fn().mockReturnValueOnce(user)}

    UserModel.build = jest.fn().mockReturnValue(saveMock)
    

    const userService = new UserService()
    const result = await userService.createUser(user)
    expect(result.name).toEqual('Guilherme')

  })

  it('should find all users', async () => {
    const users: User[] = [
      {
        id: '123',
        name: 'Guilherme',
        email: 'teste@teste'
      },
      {
        id: '456',
        name: 'Alves',
        email: 'fake@fake'
      }
    ]

    UserModel.findAll = jest.fn().mockReturnValue(users)

    const userService = new UserService()
    const findUsers = await userService.findAllUsers()
    
    expect(findUsers.length).toEqual(2)
    expect(findUsers).toEqual(expect.arrayContaining([expect.objectContaining({name: 'Alves'})]))

  })
})