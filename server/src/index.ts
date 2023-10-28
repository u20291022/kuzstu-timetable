import Koa from "koa";
import KoaRouter from "@koa/router";

import http from "http";
import https from "https";

import { readFileSync } from "fs";
import { search } from "./api/search";
import { timetable } from "./api/timetable";
import { TimetableType } from "./types/timetable.types";

const server = new Koa();
const router = new KoaRouter();

const serverHttpPort = 80;
const serverHttpsPort = 443;

const serverCert = readFileSync("data/client-cert.pem");
const serverKey = readFileSync("data/client-key.pem");

const logRequest = (request: Koa.Request): void => {
  const date = new Date();
  const time = date.toLocaleTimeString("ru-RU");
  const userIp = request.ip;

  console.log(`[${time}] ${userIp} has get "${decodeURI(request.url)}"`);
};

router.get("/timetable-search", async (context) => {
  context.set("Content-Type", "application/json");
  context.set("Access-Control-Allow-Origin", "*");

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

router.get("/timetable-get", async (context) => {
  context.set("Content-Type", "application/json");
  context.set("Access-Control-Allow-Origin", "*");

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

http.createServer(server.callback()).listen(serverHttpPort);
console.log(`Server was started on http ${serverHttpPort} port`);

https.createServer({
  cert: serverCert,
  key: serverKey
}, server.callback()).listen(serverHttpsPort);

console.log(`Server was started on https ${serverHttpsPort} port`);