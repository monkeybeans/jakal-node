import fs from 'fs';
import npath from 'path';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import Auth from '../../../app/dist/authenticate';
// import App from '../../../app/dist/application';

const stringFromPath = path => {
  return fs.readFileSync(npath.resolve(__dirname, path), 'utf-8');
}

// const MOUNT_POINT = /<!--MOUNT_BEGIN[\s\S]*MOUNT_END-->/;

function loadAuth(req, res) {
  const doc = stringFromPath('../../../app/web/auth.html');
  // const html = ReactDOMServer.renderToString(React.createElement(Auth));
  //
  // const doc = stringFromPath('../../../app/web/auth.html')
  //   .replace(MOUNT_POINT, html);

  res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
  res.send(doc);
}

function loadApp(req, res) {
  const doc = stringFromPath('../../../app/web/index.html')
  // const html = ReactDOMServer.renderToString(React.createElement(App));
  //
  // const doc = stringFromPath('../../../app/web/index.html')
  //   .replace(MOUNT_POINT, html);

  //res.send(doc);
  res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
  res.send(doc);
}

export {
  loadAuth,
  loadApp,
}
