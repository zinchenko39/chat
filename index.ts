import { AllPages } from './src/pages/allPages';
import { LoginPage } from './src/pages/login';
import { RegisterPage } from './src/pages/register';
import { ErrorPage } from './src/pages/error';
import { MainPage } from './src/pages/main';
import { ProfilePage } from './src/pages/profile';
import renderDOM from './src/utils/renderDom';

window.addEventListener('DOMContentLoaded', () => {
  const pages = [
    {
      link: '/register',
      label: 'register',
    },
    {
      link: '/login',
      label: 'login',
    },
    {
      link: '/main',
      label: 'main',
    },
    {
      link: '/profile',
      label: 'profile',
    },
    {
      link: '/error',
      label: 'error',
    },
  ];

  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const mainPage = new MainPage();
  const profilePage = new ProfilePage({ userName: 'Вадим' });
  const error404 = new ErrorPage({ errorNumber: 404, errorText: 'Упс... не туда попали' });
  const allPages = new AllPages({ pages: pages });

  switch (window.location.pathname) {
    case '/register':
      renderDOM(registerPage);
      break;
    case '/login':
      renderDOM(loginPage);
      break;
    case '/main':
      renderDOM(mainPage);
      break;
    case '/profile':
      renderDOM(profilePage);
      break;
    case '/error':
      renderDOM(error404);
      break;
    default:
      renderDOM(allPages);
      break;
  }
});
