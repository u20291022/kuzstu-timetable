import Koa from "koa";
import Router from "@koa/router";

import http from "http";
import https from "https";

import { readFileSync } from "fs";

import { ServerOptions } from "./types/server.types";
import { logs } from "./utils/logs";
import { timetableSearch } from "./api/search";
import { timetableGet } from "./api/get";
import { TimetableType } from "./types/get.types";

const serverOptions: ServerOptions = {
  httpPort: 80,
  httpsPort: 443,
  ssl: {
    certificate: readFileSync("data/client-cert.pem"),
    key: readFileSync("data/client-key.pem")
  }
}

const server = new Koa();
const router = new Router({
  prefix: "/timetable",
  methods: ["get"]
});

const logRequest = (context: Koa.Context) => {
  const request = context.request;
  const userIP = request.ip;
  const url = decodeURI(request.url);

  const message = `${userIP} has requested "${url}"!`;

  logs.write(message);
}

router.get("/search", async (context) => {
  logRequest(context);

  context.set("Content-Type", "application/json");
  context.set("Access-Control-Allow-Origin", "*");

  const queryData = context.query;
  const searchData = queryData["data"];

  if (!searchData) {
    context.body = "{}";
    return;
  }

  context.body = await timetableSearch.get(<string>searchData);
})

router.get("/get", async (context) => {
  logRequest(context);
  
  context.set("Content-Type", "application/json");
  context.set("Access-Control-Allow-Origin", "*");

  const queryData = context.query;
  const type = queryData["type"];
  const id = queryData["id"];

  if (!type || !id) {
    context.body = "{}";
    return;
  }

  context.body = await timetableGet.get(<TimetableType>type, <string>id);
})

server.use(router.routes()).use(router.allowedMethods());

http.createServer(server.callback()).listen(serverOptions.httpPort);
logs.write(`HTTP Server has started on port ${serverOptions.httpPort}!`);

https.createServer({
  cert: serverOptions.ssl.certificate,
  key: serverOptions.ssl.key
}, server.callback()).listen(serverOptions.httpsPort);

logs.write(`HTTPS Server has started on port ${serverOptions.httpsPort}!`);