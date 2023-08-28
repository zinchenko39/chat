import { Button } from '../../components/button';
import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import InfoInputs from '../../components/info-inputs';
// import { PasswordInputs } from '../../components/password-inputs';
import { ProfileSideBar } from '../../components/profile-side-bar';
import { ProfileProps } from './props';
import avatar from '../../assets/images/avatar-man.svg';
import { connect } from '../../utils/connect';
import { AvatarLogo } from '../../components/avatarLogo';
import { userController } from '../../controllers/UserController';
import { store } from '../../utils/Store';

class ProfileInfoPage extends Block {
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

  showAvatar() {
    const avatarUrl = store?.getState().user?.avatar;
    const baseUrl = 'https://ya-praktikum.tech/api/v2/resources';
    const fullAvatarUrl = store?.getState().user?.avatar ? `${baseUrl}${avatarUrl}` : avatar;
    this.children.avatarLogo = new AvatarLogo({
      url: fullAvatarUrl,
      events: {
        change: (event) => this.handleChangeAvatar(event),
      },
    });
  }

  handleChangeAvatar(event: any) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      userController.changeAvatar(formData);
    } else {
      console.error('No file selected');
    }
  }

  render() {
    this.showAvatar();
    return this.compile(template, { ...this.props, styles });
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(ProfileInfoPage);
