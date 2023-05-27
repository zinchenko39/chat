import Block from '../../utils/Block';
import { Button } from '../../components/test_btn';
import template from './home.pug';

interface HomePageProps {
  title: string;
}

export class HomePage extends Block {
  constructor(props: HomePageProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: 'Click',
      events: {
        click: () => console.log(1),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
