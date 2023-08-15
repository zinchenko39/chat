import Block from '../../../../../../utils/Block';
import template from './index.pug';
import pointsLogo from '../../../../../../assets/images/three_points.svg';

interface IDotsMenuProps {
  events?: { click: (event: PointerEvent) => void };
}

export class DotsMenu extends Block {
  constructor(props: IDotsMenuProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, pointsLogo });
  }
}
