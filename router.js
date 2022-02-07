import Event from "events";

export class Router {
  constructor () {
    this.endpoints = {};
  }

  request(method = "GET", route, handler) {
    if (!this.endpoints[route]) {
      this.endpoints[route] = {};
    }

    const endpoint = this.endpoints[route];

    if (endpoint[method]) {
      throw new Error("Method already exists for the route")
    }

    endpoint[method] = handler;

    event.on(`[${route}]:[${method}]`, (req, res) => {
      handler(req, res)
    }) 
  }

  get(route, handler) {
    this.request("GET", route, handler);
  }

  post(route, handler) {
    this.request("POST", route, handler);
  }

  put(route, handler) {
    this.request("PUT", route, handler);
  }

  delete(route, handler) {
    this.request("DELETE", route, handler);
  }
}