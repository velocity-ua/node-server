import http from "http";
import event from "events";

export class Server {
  constructor() {
    this.event = new event();
    this.server = this.#createServer();
    this.middlwares = [];
  }

  #createServer() {
    return http.createServer((req, res) => {
      let body = "";
      
      req.on("data", (chunk) => {
        body += chunk;
      });
      
      req.on("end", () => {
        if (body) {
          req.body = JSON.parse(body);
        }
        
        this.middlwares.forEach(mw => mw(req, res));
        const emmited = this.event.emit(this.#getRouteMast(req.pathname, req.method), req, res);

        if (!emmited) {
          res.end();
        }
      });
    });
  }

  use(middlware) {
    this.middlwares.push(middlware);
  }

  #getRouteMast(route, method) {
    return `[${route}]:[${method}]`
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach(rt => {
      const endpoint = router.endpoint[rt];
      Object.keys(endpoint).forEach(method => {
        const handler = endpoint[method];
        this.event.on(this.#getRouteMast(rt, method, (req, res) => {
          handler(req, res);
        }))
      })
    })
  }

  listen(port, cb) {
    this.server.listen(port, cb);
  }
}