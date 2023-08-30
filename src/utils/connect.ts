import Block from './Block/Block';
import { store, STORE_EVENTS } from './Store';

export function connect(Component: typeof Block) {
  return class extends Component {
    constructor(...args: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      super(...args);

      store.on(STORE_EVENTS.UPDATE, () => {
        this.setProps({ ...store.getState() });
      });
    }
  };
}
