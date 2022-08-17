import UserModel from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';

export default class LoginService {
  public checkUser = async (email: string): Promise<ILogin> => {
    const login = await UserModel.findOne({ where: { email } }) as unknown as ILogin;

    return login;
  };
}
