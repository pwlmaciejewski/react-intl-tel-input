import jsdom from 'jsdom';
import hook from 'css-modules-require-hook';
import sass from 'node-sass';
import sinon from 'sinon';

// Define some html to be our basic document
// JSDOM will consume this and act as if we were in a browser
const DEFAULT_HTML = '<!doctype html><html><body></body></html>';

// Define some variables to make it look like we're a browser
// First, use JSDOM's fake DOM as the document
global.document = jsdom.jsdom(DEFAULT_HTML);

// Set up a mock window
global.window = document.defaultView;

// Allow for things like window.location
global.navigator = window.navigator;

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.scss', '.css'],
  preprocessCss: (data, filename) =>
    sass.renderSync({
      data,
      file: filename,
    }).css,
});
