export const Ping = function() {
  let favicon = "/favicon.ico";
  let timeout = 0;
  let logError = false;
  this.ping = (source, callback) => {
    let wasSuccess = false;
    let img = new Image();
    img.onload = onload;
    img.onerror = onerror;

    let timer;
    let start = new Date();

    function onload(e) {
      wasSuccess = true;
      pingCheck(e);
    }

    function onerror(e) {
      wasSuccess = false;
      pingCheck(e);
    }

    if (timeout) {
      timer = setTimeout(function() {
        pingCheck(undefined);
      }, timeout);
    }

    const pingCheck = () => {
      if (timer) {
        clearTimeout(timer);
      }
      let pong = new Date() - start;

      if (typeof callback === "function") {
        if (!wasSuccess) {
          if (logError) {
            console.error("error loading resource");
          }
          return callback("error", pong);
        }
        return callback(null, pong);
      }
    };
    const url = !source.includes("http") ? `http://${source}` : source;
    img.src = url + favicon + "?" + +new Date();
  };
};
