const http = require("http");

const checkApi = () => {
  return new Promise((resolve: any, reject: any) => {
    const req = http.get(
      {
        hostname: "localhost",
        port: 41414,
        path: "/",
        agent: false,
      },
      (res: any) => {
        resolve(200);
      }
    );
    req.on("error", () => {
      reject();
    });
  });
};

export default checkApi;
