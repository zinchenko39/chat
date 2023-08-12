import { UserApi } from '../api';
import { IUser, IUserPassword } from '../interfaces/Api';
import { store } from '../utils/Store';

export class UserController {
  private readonly apiUser = new UserApi();

  public updateProfile(data: IUser): void {
    this.apiUser
      .changeProfile(data)
      .then((resp) => {
        const { data, status } = resp;
        if (status === 200) {
          store.setUser(data as IUser);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public updatePassword(data: IUserPassword): void {
    this.apiUser
      .changePassword(data)
      .then(() => {
        console.log('password updated');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public changeAvatar(data: FormData): void {
    this.apiUser
      .setAvatar(data)
      .then((data) => {
        store.setUser(data as any);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const userController = new UserController();
