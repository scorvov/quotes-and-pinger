var Ping = function(opt) {
  this.opt = opt || {};
  this.favicon = "/favicon.ico";
  this.timeout = this.opt.timeout || 0;
  this.logError = this.opt.logError || false;
};

Ping.prototype.ping = function(source, callback) {
  let self = this;
  self.wasSuccess = false;
  self.img = new Image();
  self.img.onload = onload;
  self.img.onerror = onerror;

  let timer;
  let start = new Date();

  function onload(e) {
    self.wasSuccess = true;
    pingCheck.call(self, e);
  }

  function onerror(e) {
    self.wasSuccess = false;
    pingCheck.call(self, e);
  }

  if (self.timeout) {
    timer = setTimeout(function() {
      pingCheck.call(self, undefined);
    }, self.timeout);
  }

  /**
   * Times ping and triggers callback.
   */
  function pingCheck() {
    if (timer) {
      clearTimeout(timer);
    }
    let pong = new Date() - start;

    if (typeof callback === "function") {
      // When operating in timeout mode, the timeout callback doesn't pass [event] as e.
      // Notice [this] instead of [self], since .call() was used with context
      if (!this.wasSuccess) {
        if (self.logError) {
          console.error("error loading resource");
        }
        return callback("error", pong);
      }
      return callback(null, pong);
    }
  }
  const url = !source.includes("http") ? `http://${source}` : source;
  self.img.src = url + self.favicon + "?" + +new Date(); // Trigger image load with cache buster
};

if (typeof exports !== "undefined") {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ping;
  }
} else {
  window.Ping = Ping;
}
