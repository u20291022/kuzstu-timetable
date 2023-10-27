import Koa from "koa";
import KoaRouter from "@koa/router";

import https from "https";

import { readFileSync } from "fs";
import { search } from "./api/search";
import { timetable } from "./api/timetable";
import { TimetableType } from "./types/timetable.types";

const server = new Koa();
const router = new KoaRouter();

const serverPort = 8001;
const serverCert = readFileSync("data/certificate.crt");
const serverKey = readFileSync("data/certificate.key");

const logRequest = (request: Koa.Request): void => {
  const date = new Date();
  const time = date.toLocaleTimeString("ru-RU");
  const userIp = request.ip;
  const queryString = decodeURI(request.querystring);

  console.log(`[${time}] ${userIp} has get search with "${queryString}" query`);
};

router.get("/search", async (context) => {
  context.set("Content-Type", "application/json");

  const { request } = context;

  logRequest(request);

  const dataToSearch = request.query["data"];

  if (!dataToSearch) {
    context.body = "{}";
    return;
  }

  const searchResults = await search.getSearchResult(<string>dataToSearch);

  context.body = JSON.stringify(searchResults);
});

router.get("/timetable", async (context) => {
  context.set("Content-Type", "application/json");

  const { request } = context;

  logRequest(request);

  const timetableType = request.query["type"];
  const timetableId = request.query["id"];

  if (!timetableType || !timetableId) {
    context.body = "{}";
    return;
  }

  const timetableResults = await timetable.getTimetable(<TimetableType>timetableType, <string>timetableId);

  context.body = JSON.stringify(timetableResults);
});

server.use(router.routes()).use(router.allowedMethods());

https.createServer({
  cert: serverCert,
  key: serverKey
}, server.callback()).listen(serverPort);

console.log(`Server was started on https ${serverPort} port`);