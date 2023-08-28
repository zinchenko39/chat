import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { Button } from '../../components/button';
import InputWrapper from '../../components/input-wrapper';
import { authController } from '../../controllers/AuthControllers';

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
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.login = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Введите логин',
      type: 'text',
      events: {
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
      type: 'tel',
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
      type: 'password',
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.repeatPassword = new InputWrapper({
      name: 'repeatPassword',
      label: 'Пароль (еще раз)',
      placeholder: 'Введите пароль еще раз',
      type: 'password',
      events: {
        blur: () => this.checkFields(),
      },
    });

    this.children.button = new Button({
      text: 'Зарегестрироваться',
      width: '160px',
      events: {
        click: (event) => this.onSubmit(event),
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
    const password = this.children.password.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const repeatPassword = this.children.repeatPassword.children.input.getValue();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z]).{7,}$/;

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
    // Password validation
    if (!passwordRegex.test(password)) {
      (this.children.password as Block).setProps({
        error: 'Минимум 7 символов и  1 заглавная буква',
      });
    } else {
      (this.children.password as Block).setProps({ error: '' });
    }
    // RepeatPassword validation
    if (password !== repeatPassword) {
      (this.children.repeatPassword as Block).setProps({
        error: 'Пароли должны совпадать',
      });
    } else {
      (this.children.repeatPassword as Block).setProps({ error: '' });
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
            return true; // Если найдена ошибка, возвращаем true
          }
          return hasErrors(value); // Рекурсивно проверяем вложенные объекты
        }
        return false;
      });
    }
    if (!hasErrors(this.children)) {
      authController.signUp(data);
    }
  }

  render() {
    return this.compile(template, { styles });
  }
}
