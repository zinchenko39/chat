import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { Button } from '../../components/button';
import { InputWrapper } from '../../components/inputWrapper';

export class RegisterPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new InputWrapper({
      name: 'email',
      label: 'Почта',
      placeholder: 'Введите почту',
      type: 'email',
    });
    this.children.email = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
    });
    this.children.first_name = new InputWrapper({
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Введите имя',
    });
    this.children.second_name = new InputWrapper({
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Введите фамилию',
    });
    this.children.phone = new InputWrapper({
      name: 'phone',
      label: 'Телефон',
      placeholder: 'Введите телефон',
    });
    this.children.password = new InputWrapper({
      name: 'phone',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password',
    });
    this.children.repeatPassword = new InputWrapper({
      name: 'phone',
      label: 'Пароль (еще раз)',
      placeholder: 'Введите пароль еще раз',
      type: 'password',
    });

    this.children.button = new Button({
      text: 'Зарегестрироваться',
      width: '160px',
    });
  }

  render() {
    return this.compile(template, { styles });
  }
}
