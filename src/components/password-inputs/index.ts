import { Button } from '../button';
import { InputWrapper } from '../input-wrapper';
import Block from '../../utils/Block';
import template from './index.pug';

export class PasswordInputs extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.oldPassword = new InputWrapper({
      name: 'oldPassword',
      label: 'Старый пароль',
      placeholder: 'Старый пароль',
      type: 'password',
      width: '100%',
      textAlign: 'left',
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.newPassword = new InputWrapper({
      name: 'newPassword',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      type: 'password',
      width: '100%',
      textAlign: 'left',
      events: {
        blur: () => this.checkFields(),
      },
    });
    this.children.newPasswordAgain = new InputWrapper({
      name: 'newPasswordAgain',
      label: 'Повторите новый пароль',
      placeholder: 'Повторите новый пароль',
      type: 'password',
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
    this.children.buttonBack = new Button({
      text: 'Назад',
      width: '160',
    });
    this.children.buttonChangePassword = new Button({
      text: 'Изменить пароль',
      width: '160',
    });
  }

  checkFields() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const oldPassword = this.children.oldPassword.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newPassword = this.children.newPassword.children.input.getValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newPasswordAgain = this.children.newPasswordAgain.children.input.getValue();

    const passwordRegex = /^(?=.*[A-Z]).{7,}$/;

    // Password validation
    if (!passwordRegex.test(newPassword)) {
      (this.children.newPassword as Block).setProps({
        error: 'Минимум 7 символов и  1 заглавная буква',
      });
    } else {
      (this.children.newPassword as Block).setProps({ error: '' });
    }
    // RepeatPassword validation
    if (newPassword !== newPasswordAgain) {
      (this.children.newPasswordAgain as Block).setProps({
        error: 'Пароли должны совпадать',
      });
    } else {
      (this.children.newPasswordAgain as Block).setProps({ error: '' });
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
