const templates = `<script>
var ws = new WebSocket("ws://localhost:41414");
ws.onopen = function () {
  console.log("open");
  ws.send("hello");
};
ws.onmessage = function (e) {
  console.log(e.data);
};
ws.onclose = function (e) {
  console.log("close");
};
ws.onerror = function (e) {
  console.log(error);
};

var old = window.fetch;

window.fetch = function() {
  var now = new Date();
  return old.apply(this, arguments).then(response => {
    if (!/\\.(js|css|map)$/.test(response.url)) {
      const args = arguments[1] ?? { method: 'GET' };
      response
        .clone()
        .json()
        .then(res => {
          ws.send(
            JSON.stringify({
              time: new Date() - now,
              url: arguments[0] || response.url,
              method: args.method,
              data: JSON.parse(args.body || '{}'),
              body: res,
            }),
          );
        });
    }

    return response;
  });
};

</script>`;

export default templates;
