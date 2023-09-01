const { JSDOM } = require('jsdom');
const pug = require('pug');
const fs = require('fs');

const { window } = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:5173',
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.FormData = window.FormData;
global.XMLHttpRequest = window.XMLHttpRequest;

require.extensions['.pug'] = function (module, filename) {
  const template = fs.readFileSync(filename, 'utf-8');
  const compiledTemplate = pug.compile(template);
  module.exports = compiledTemplate;
};

require.extensions['.pcss'] = function () {
  module.exports = () => ({});
};

require.extensions['.svg'] = function () {
  module.exports = () => ({});
};
