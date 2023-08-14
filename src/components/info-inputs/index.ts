import { Button } from '../button';
import InputWrapper from '../input-wrapper';
import Block from '../../utils/Block';
import template from './index.pug';
import { authController } from '../../controllers/AuthControllers';
import { userController } from '../../controllers/UserController';
import { connect } from '../../utils/connect';
import Router from '../../utils/Router';
import { RouterPath } from '../../constants/AppConstants';

class InfoInputs extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new InputWrapper({
      name: 'email',
      label: 'Почта',
      placeholder: 'Почта',
      type: 'email',
      width: '100%',
      textAlign: 'left',
      events: {
        blur: () => this.checkFields(),
      },
      value: this.props?.user?.email,
    });
    this.children.login = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      events: {
        blur: () => this.checkFields(),
      },
      value: this.props?.user?.login,
    });
    this.children.first_name = new InputWrapper({
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      value: this.props?.user?.first_name,
    });
    this.children.second_name = new InputWrapper({
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      value: this.props?.user?.second_name,
    });
    this.children.display_name = new InputWrapper({
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      value: this.props?.user?.display_name,
    });
    this.children.phone = new InputWrapper({
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Телефон',
      type: 'text',
      width: '100%',
      textAlign: 'left',
      events: {
        blur: () => this.checkFields(),
      },
      value: this.props?.user?.phone,
    });
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      events: {
        click: (event) => this.onSubmit(event),
      },
    });
    this.children.buttonChangePassword = new Button({
      text: 'Изменить пароль',
      events: {
        click: () => Router.go(RouterPath.profilePassword),
      },
    });
    this.children.buttonExit = new Button({
      text: 'Выйти',
      bgColor: 'red',
      events: {
        click: () => this.logout(),
      },
    });
  }

  checkFields() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const email = this.children.email.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const login = this.children.login.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const phone = this.children.phone.children.input.getValue();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+\-()\d\s]+$/;

    // Email validation
    if (!emailRegex.test(email)) {
      (this.children.email as Block).setProps({
        error: 'Пример: test@yandex.ru',
      });
    } else {
      (this.children.email as Block).setProps({ error: '' });
    }
    // Login validation
    if (login?.length < 3) {
      (this.children.login as Block).setProps({ error: 'Минимальная длина 3 символа' });
    } else if (login?.length > 15)
      (this.children.login as Block).setProps({ error: 'Максимальная длина 15 символа' });
    else {
      (this.children.login as Block).setProps({ error: '' });
    }
    // Phone validation
    if (!phoneRegex.test(phone)) {
      (this.children.phone as Block).setProps({
        error: 'Введите только цифры',
      });
    } else {
      (this.children.phone as Block).setProps({ error: '' });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const values = Object.values(this.children)
      .filter((child) => child instanceof InputWrapper)
      .map((child) => [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (child as InputWrapper).children.input.getName(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (child as InputWrapper).children.input.getValue(),
      ]);
    const data = Object.fromEntries(values);
    this.checkFields();
    function hasErrors(obj: any): boolean {
      return Object.values(obj).some((value) => {
        if (typeof value === 'object' && value !== null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (value.props?.error) {
            return true;
          }
          return hasErrors(value);
        }
        return false;
      });
    }
    if (!hasErrors(this.children)) {
      userController.updateProfile(data);
    }
  }

  logout(): void {
    authController.logout();
  }

  render() {
    this.init();
    return this.compile(template, { ...this.props });
  }
}

export default connect(InfoInputs);
