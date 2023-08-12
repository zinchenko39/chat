import Block from '../../utils/Block';
import template from './index.pug';
import { Button } from '../button';
import InputWrapper from '../input-wrapper';
import styles from './index.scss';

interface IModal {
  show?: boolean;
  view?: string;
  sendFunction: (inputValue: string) => void;
}
export class Modal extends Block {
  constructor(props: IModal) {
    super({
      ...props,
      show: false,
    });
  }
  public newChatView() {
    this.children.input = new InputWrapper({
      name: 'search',
      label: ' ',
      placeholder: 'Введите название чата',
      type: 'text',
      width: '300px',
      textAlign: 'left',
    });
    this.children.saveButton = new Button({
      text: 'Сохранить',
      bgColor: '#49cc90',
      events: {
        click: () => {
          if (this.checkEmptyInput()) return;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.props?.sendFunction(this.children.input.children.input.getValue());
        },
      },
    });
    this.children.cancelButton = new Button({
      text: 'Назад',
      events: {
        click: () => this.hide(),
      },
    });
  }

  public show() {
    this.setProps({ show: true });
  }

  public hide() {
    this.setProps({ show: false });
  }

  public togle() {
    this.setProps({ show: !this.props.show });
  }

  checkEmptyInput() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const input = this.children.input.children.input.getValue();
    const regularExpEmptyString = /^\s*$/;

    if (regularExpEmptyString.test(input)) {
      (this.children.input as Block).setProps({
        error: 'Строка не должна быть пустой',
      });
      return true;
    } else {
      (this.children.input as Block).setProps({ error: '' });
      return false;
    }
  }

  render() {
    this.props.view === 'newChat' ? this.newChatView() : null;
    return this.compile(template, { ...this.props, styles });
  }
}
