import { AuthApi } from '../api';
import { ISignUpData } from '../interfaces/Api';
import { store } from '../utils/Store';
import { RouterPath } from '../constants/AppConstants';
import Router from '../utils/Router/Router';

export class AuthController {
  private readonly api = new AuthApi();

  public signIn(data: ISignUpData): void {
    this.api
      .signIn(data)
      .then(() => {
        this.getUser();
        Router.go(RouterPath.main);
      })
      .catch((error) => {
        try {
          const { reason } = JSON.parse(error);
          if (reason === 'User already in system') {
            Router.go(RouterPath.main);
          }
        } catch {
          console.log(error);
        }
      });
  }

  public signUp(data: ISignUpData): void {
    this.api
      .signup(data)
      .then(() => {
        this.getUser();
        Router.go(RouterPath.main);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public logout(): void {
    this.api
      .logout()
      .then(() => {
        Router.go(RouterPath.login);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getUser(): void {
    this.api
      .getUser()
      .then((data) => {
        store.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        Router.go(RouterPath.login);
      });
  }
}

export const authController = new AuthController();
