import Block from '../../utils/Block/Block';
import template from './index.pug';
import styles from './index.scss';
import { ErrorProps } from './props';

export class ErrorPage extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
