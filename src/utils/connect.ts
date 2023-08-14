import Block from './Block';
import { store, STORE_EVENTS } from './Store';

export function connect(Component: typeof Block) {
  return class extends Component {
    constructor(...args) {
      super(...args);

      store.on(STORE_EVENTS.UPDATE, () => {
        this.setProps({ ...store.getState() });
      });
    }
  };
}
