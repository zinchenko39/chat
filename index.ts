import { LoginPage } from './src/pages/login';
import { RegisterPage } from './src/pages/register';
import { ErrorPage } from './src/pages/error';
import MainPage from './src/pages/main';
import ProfileInfoPage from './src/pages/profile-info';
import { ProfilePasswordPage } from './src/pages/profile-password';
import Router from './src/utils/Router';
import { RouterPath } from './src/constants/AppConstants';

Router.use(RouterPath.login, LoginPage, false)
  .use(RouterPath.register, RegisterPage, false)
  .use(RouterPath.main, MainPage, true)
  .use(RouterPath.profile, ProfileInfoPage, true)
  .use(RouterPath.profilePassword, ProfilePasswordPage, true)
  .use(RouterPath.page404, ErrorPage, false)
  .start();
