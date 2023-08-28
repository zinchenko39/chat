import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { Button } from '../../components/button';
import InputWrapper from '../../components/input-wrapper';
import { authController } from '../../controllers/AuthControllers';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.login = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
      type: 'password',
      placeholder: 'Введите пароль',
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.button = new Button({
      text: 'Войти',
      type: 'submit',
      events: {
        click: (event) => this.onSubmit(event),
      },
    });
  }

  checkFields() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const login = this.children.login.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const password = this.children.password.children.input.getValue();
    const passwordRegex = /^(?=.*[A-Z]).{7,}$/;

    // Login validation
    if (login?.length < 3) {
      (this.children.login as Block).setProps({ error: 'Минимальная длина 3 символа' });
    } else if (login?.length > 15)
      (this.children.login as Block).setProps({ error: 'Максимальная длина 15 символа' });
    else {
      (this.children.login as Block).setProps({ error: '' });
    }
    // Password validation
    if (!passwordRegex.test(password)) {
      (this.children.password as Block).setProps({
        error: 'Пароль должен быть минимум 7 символов и содержать 1 заглавную букву',
      });
    } else {
      (this.children.password as Block).setProps({ error: '' });
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const values = Object.values(this.children)
      .filter((child) => child instanceof InputWrapper)
      .map((child) => [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        child.children.input.getName(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        child.children.input.getValue(),
      ]);
    const data = Object.fromEntries(values);
    this.checkFields();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.children.login.props.error && !this.children.password.props.error)
      authController.signIn(data);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
