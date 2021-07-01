const port = 41414;

import Koa from "koa2";
import url from "url";
import qs from "qs";
import path from "path";
import fs from "fs-extra";
import route from "koa-route";
import Router from "koa-router";
import staticServer from "koa-static";
import websockify from "koa-websocket";

const success = (data: any) => {
  return { code: 0, data, message: "成功" };
};

const fail = (data: any) => {
  return { code: -1, data, message: "失败" };
};

const USER_HOME: string = process.env.HOME || process.env.USERPROFILE || "";
const filepath = path.resolve(USER_HOME, "webpack-plugin-api/cache.api");

fs.ensureFileSync(filepath);

const app = websockify(new Koa());

const temp = JSON.parse(fs.readFileSync(filepath).toString() || "{}");

const router = new Router();

// app.ws.use(function (ctx: any, next) {
//   return next(ctx);
// });

app.ws.use(
  route.all("/", function (ctx) {
    /**接收消息*/
    ctx.websocket.on("message", function (message: string) {
      if (message.indexOf('"method":') > -1) {
        const js = JSON.parse(message);
        const { pathname, search } = new url.URL(js.url);
        const query = qs.parse(search.indexOf("?") > -1 ? search.substr(1) : "") || {};
        const old = temp[`${js.method} ${pathname}`] || {};

        temp[`${js.method} ${pathname}`] = {
          ...old,
          ...js,
          time: ((old.time || js.time) + js.time) / 2,
          pathname,
          query: { ...old, ...query },
          date: (new Date() as any) * 1,
        };
        fs.writeFile(filepath, JSON.stringify(temp), (err: any) => {
          console.log(err);
        });
      }
      ctx.websocket.send("ok");
    });
  })
);

app.use(staticServer("./public", { extensions: ["html"] }));

router.get("/api/apis", async (ctx) => {
  ctx.body = success(temp);
});

app.use(router.routes());

app.listen(port, () => {
  console.log("localhost:" + port);
});
