import { Router } from './router.js';
import { Server } from "./server.js";
import {headers, queries} from './middlware.js';

const PORT = process.env.PORT || 3500;

const server = new Server();
server.use(headers);
server.use(queries(`http://localhost:${PORT}`));

const router = new Router();

router.get("/files", (req, res => {
  res.end("file response");
}));

router.get("/cards", (req, res => {
  res.end("/cards response");
}))

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));