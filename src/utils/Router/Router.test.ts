import { Router } from './Router';
import Profile from '../../pages/profile-info';
import { LoginPage } from '../../pages/login';
import { RouterPath } from '../../constants/AppConstants';

describe('ROUTER', () => {
  let app: HTMLElement;
  let router: Router;

  beforeAll(() => {
    app = document.createElement('div');
    app.setAttribute('id', 'root');
    document.body.append(app);
    router = new Router();
  });

  it('use', () => {
    router.use(RouterPath.login, LoginPage, true).use(RouterPath.profile, Profile, false);

    expect(router.routes).toHaveLength(2);
  });

  it('router is singleton', () => {
    const a = new Router();
    const b = new Router();

    expect(a).toBe(b);
  });
});
