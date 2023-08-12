import { EventBus } from './EventBus';
import { IState } from '../interfaces/Store';
import { IUser } from '../interfaces/Api';

export enum STORE_EVENTS {
  UPDATE = 'update',
}

export class Store extends EventBus {
  private readonly state: IState = {};

  public set(newState: Partial<IState>) {
    Object.assign(this.state, newState);
    this.emit(STORE_EVENTS.UPDATE);
  }

  public setUser(newUser: IUser) {
    this.state.user = newUser;
    this.emit(STORE_EVENTS.UPDATE);
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();
