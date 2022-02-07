import {MongoClient} from "mongodb";
import cluster from "cluster";
import Event from "events";

const mongo = new MongoClient("url");

async function start() {
  try {
    await mongo.connect();
    // await mongo.db
    
  } catch (err) {
    console.log(err)
  }
}
