import { Button } from '../../../components/button';
import { InputWrapper } from '../../../components/input-wrapper';
import Block from '../../../utils/Block';
import template from './index.pug';

export class InfoInputs extends Block {
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
    });
    this.children.first_name = new InputWrapper({
      name: 'first_name',
      label: 'Имя',
      placeholder: 'Имя',
      type: 'text',
      width: '100%',
      textAlign: 'left',
    });
    this.children.second_name = new InputWrapper({
      name: 'second_name',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      type: 'text',
      width: '100%',
      textAlign: 'left',
    });
    this.children.display_name = new InputWrapper({
      name: 'display_name',
      label: 'Имя в чате',
      placeholder: 'Имя в чате',
      type: 'text',
      width: '100%',
      textAlign: 'left',
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
    });
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      width: '160',
      events: {
        click: (event) => this.onSubmit(event),
      },
    });
    this.children.buttonChangePassword = new Button({
      text: 'Изменить пароль',
      width: '160',
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
            return true; // Если найдена ошибка, возвращаем true
          }
          return hasErrors(value); // Рекурсивно проверяем вложенные объекты
        }
        return false;
      });
    }
    if (!hasErrors(this.children)) console.log(data);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
