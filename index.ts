import { LoginPage } from './src/pages/login';
import { RegisterPage } from './src/pages/register';
import { ErrorPage } from './src/pages/error';
import { MainPage } from './src/pages/main';
import { ProfilePage } from './src/pages/profile';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const mainPage = new MainPage();
  const profilePage = new ProfilePage({ userName: 'Вадим' });
  const error404 = new ErrorPage({ errorNumber: 404, errorText: 'Упс... не туда попали' });

  root?.append(profilePage.getContent()!);

  profilePage.dispatchComponentDidMount();
});
