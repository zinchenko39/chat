import Block from './Block';
import { RouterPath } from '../constants/AppConstants';
import { authController } from '../controllers/AuthControllers';

// interface PropsT {
//   routes: TypeRoute[];
//   path: RouterPath;
//   render: (value: TypeRoute) => void;
// }

// function isEqual(lhs: string, rhs: string): boolean {
//   return lhs === rhs;
// }

export interface Component<P extends Record<string, unknown> = any> {
  new (props: P): Block<P>;
}

const render = (block: Block) => {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Root not found');
  }

  root.innerHTML = '';

  root.append(block.getContent());
  block.dispatchComponentDidMount();
};

class Route {
  private block: Block | null = null;

  constructor(private pathname: string, private Block: Component, public isProtected: boolean) {}

  public leave() {
    this.block = null;
  }

  public render() {
    if (!this.block) {
      this.block = new this.Block({});

      render(this.block);
    }
  }

  public match(pathname: string) {
    return this.pathname === pathname;
  }
}

export type TypeRoute = Route;

class Router {
  private static __instance: Router | null = null;

  private routes: Route[] = [];

  private history = window.history;

  private currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    Router.__instance = this;
  }

  public use(pathname: string, block: Component, isProtected: boolean) {
    const route = new Route(pathname, block, isProtected);
    this.routes.push(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  private async _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.go('/404');
      return;
    }

    if (route.isProtected) {
      try {
        authController.getUser();
      } catch (e) {
        this.go(RouterPath.login);
        return;
      }
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }
    this.currentRoute = route;

    route.render();
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default new Router();
