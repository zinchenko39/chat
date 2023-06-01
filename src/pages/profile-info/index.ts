import { Button } from '../../components/button';
import Block from '../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import { InfoInputs } from '../../components/info-inputs';
import { PasswordInputs } from '../../components/password-inputs';
import { ProfileSideBar } from '../../components/profile-side-bar';
import { ProfileProps } from './props';
import avatarLogo from '../../assets/images/avatar-man.svg';

export class ProfileInfoPage extends Block {
  constructor(props: ProfileProps) {
    super(props);
  }
  init() {
    this.children.infoInputs = new InfoInputs();
    this.children.profileSideBar = new ProfileSideBar();
    this.children.buttonSave = new Button({
      text: 'Сохранить',
      width: '160',
      type: 'submit',
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

  render() {
    return this.compile(template, { ...this.props, styles, avatarLogo });
  }
}
