import Block from '../../utils/Block';
import { Input } from '../../components/input';
import template from './index.pug';
import styles from './index.scss';
import { Button } from '../../components/button';
import { LoginPageProps } from './props';
import { InputWrapper } from '../../components/inputWrapper';

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super(props);
  }

  init() {
    this.children.login = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      events: {
        change: () => console.log(1),
        blur: () => this.checkFields(),
      },
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
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

    if (login?.length < 3) {
      (this.children.login as Block).setProps({ error: 'Минимальная длина 3 символа' });
    } else if (login?.length > 15)
      (this.children.login as Block).setProps({ error: 'Максимальная длина 15 символа' });
    else {
      (this.children.login as Block).setProps({ error: '' });
    }
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
      .filter((child) => child instanceof Input)
      .map((child) => [(child as Input).getName(), (child as Input).getValue()]);
    const data = Object.fromEntries(values);
    this.checkFields();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!this.children.login.props.error && !this.children.password.props.error) console.log(data);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
