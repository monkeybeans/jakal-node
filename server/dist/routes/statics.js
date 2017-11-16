'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadApp = exports.loadAuth = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import Auth from '../../../app/dist/authenticate';
// import App from '../../../app/dist/application';

const stringFromPath = path => {
  return _fs2.default.readFileSync(_path2.default.resolve(__dirname, path), 'utf-8');
};

// const MOUNT_POINT = /<!--MOUNT_BEGIN[\s\S]*MOUNT_END-->/;

function loadAuth(req, res) {
  const doc = stringFromPath('../../../app/web/auth.html');
  // const html = ReactDOMServer.renderToString(React.createElement(Auth));
  //
  // const doc = stringFromPath('../../../app/web/auth.html')
  //   .replace(MOUNT_POINT, html);

  res.send(doc);
}

function loadApp(req, res) {
  const doc = stringFromPath('../../../app/web/index.html');
  // const html = ReactDOMServer.renderToString(React.createElement(App));
  //
  // const doc = stringFromPath('../../../app/web/index.html')
  //   .replace(MOUNT_POINT, html);

  //res.send(doc);
  res.send(doc);
}

exports.loadAuth = loadAuth;
exports.loadApp = loadApp;