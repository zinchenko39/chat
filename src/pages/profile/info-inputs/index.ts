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
    });
    this.children.login = new InputWrapper({
      name: 'login',
      label: 'Логин',
      placeholder: 'Логин',
      type: 'text',
      width: '100%',
      textAlign: 'left',
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
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
