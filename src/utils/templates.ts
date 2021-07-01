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

window.fetch = function () {
  return old.apply(this, arguments).then((response) => {
    console.log(response.clone().json());

    return response;
  });
};
</script>`;

export default templates;
