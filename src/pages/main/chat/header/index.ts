import Block from '../../../../utils/Block';
import template from './index.pug';
import styles from './index.scss';
import avatarLogo from '../../../../assets/images/avatar-man.svg';
import pointsLogo from '../../../../assets/images/three_points.svg';
import plusLogo from '../../../../assets/images/plus-round.svg';
import deleteUserLogo from '../../../../assets/images/close-round.svg';
import cleanLogo from '../../../../assets/images/garbage-round.svg';

const images = {
  avatarLogo,
  pointsLogo,
  plusLogo,
  deleteUserLogo,
  cleanLogo,
};

export class ChatHeader extends Block {
  constructor() {
    super({});
  }

  render() {
    return this.compile(template, { ...this.props, styles, ...images });
  }
}
