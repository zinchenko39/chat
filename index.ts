import { LoginPage } from './src/pages/login';
import { RegisterPage } from './src/pages/register';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');

  const loginPage = new LoginPage({ title: 'Вход' });
  const registerPage = new RegisterPage();

  root?.append(loginPage.getContent()!);

  loginPage.dispatchComponentDidMount();
});
