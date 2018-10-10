const commands = {
  pause: function (time) {
    this.api.pause(time);
    return this;
  }
}

module.exports = {
  commands: [commands],
  url: function() {
    return this.api.launch_url + '/inbox'
  },
  elements: {
    // not much to see here yet kid
    }
  }