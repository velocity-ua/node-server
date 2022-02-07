import { Router } from "./router";
import {profiles, cards} from "./models/mock";

const router = new Router();

router.get("/profiles", (req, res) => {
  res.send(profiles);
});

router.post("/profiles", (req, res) => {
  profiles.profiles.push(req.body);
  res.send(req.body);
})