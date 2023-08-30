import { API_URL, METHODS, Options } from '../../interfaces/Api';

function queryStringify(data: Record<string, unknown>) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  let queryString = '?';
  Object.entries(data).forEach(([key, value], index) => {
    if (index === 0) {
      queryString += `${key}=${value}`;
    } else {
      queryString += `&${key}=${value}`;
    }
  });
  return queryString;
}

type HTTPMethod = <R>(url: string, options?: Partial<Options>) => Promise<R>;
class HTTPTransport {
  constructor(private entity: string) {}

  public get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  public post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  public put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  public delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  private request<R>(
    pathname: string,
    options: Partial<Omit<Options, 'timeout'>> = {},
    timeout = 5000,
  ): Promise<R> {
    const url = `${API_URL}${this.entity}${pathname}`;
    const { headers = {}, method, data } = options;

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data ? `${url}${queryStringify(data as Record<string, unknown>)}` : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (!isGet && !(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = function () {
        if (xhr.status < 400) {
          if (xhr.getResponseHeader('Content-Type')?.match('application/json;')) {
            resolve(JSON.parse(xhr.response) as R);
          } else {
            resolve(xhr.response as R);
          }
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.withCredentials = true;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
export default HTTPTransport;

export abstract class Api {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }
}
