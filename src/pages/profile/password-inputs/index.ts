import { InputWrapper } from '../../../components/input-wrapper';
import Block from '../../../utils/Block';
import template from './index.pug';

export class PasswordInputs extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.oldPassword = new InputWrapper({
      name: 'oldPassword',
      label: 'Старый пароль',
      placeholder: 'password',
      width: '100%',
      textAlign: 'left',
    });
    this.children.oldPassword = new InputWrapper({
      name: 'newPassword',
      label: 'Новый пароль',
      placeholder: 'Новый пароль',
      type: 'password',
      width: '100%',
      textAlign: 'left',
    });
    this.children.newPasswordAgain = new InputWrapper({
      name: 'newPasswordAgain',
      label: 'Повторите новый пароль',
      placeholder: 'Повторите новый пароль',
      type: 'password',
      width: '100%',
      textAlign: 'left',
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
