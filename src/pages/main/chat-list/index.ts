import { Button } from '../../../components/button';
import { ChatCard } from '../../../components/chat-card';
import { InputWrapper } from '../../../components/input-wrapper';
import Block from '../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';

export class ChatList extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.search = new InputWrapper({
      name: 'search',
      label: 'Поиск',
      placeholder: 'Введите имя пользователя для поиска',
      type: 'text',
      width: '100%',
      textAlign: 'left',
    });
    this.children.password = new InputWrapper({
      name: 'password',
      label: 'Пароль',
      placeholder: 'Введите пароль',
    });
    this.children.button = new Button({
      text: 'Профиль >',
      width: '100px',
    });
    this.children.chatCardSergey = new ChatCard({
      userName: 'Сергей',
      lastMsg: 'Привет, как дела?',
      time: '10:11',
      qtyNewMsg: 2,
    });
    this.children.chatCardIvan = new ChatCard({
      userName: 'Иван',
      lastMsg: 'Что делаешь?',
      time: '10:12',
      qtyNewMsg: 1,
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
