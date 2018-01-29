import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Router from '../../../app/src/routes/Router.server';

const makeHtml = (elementString, preloadedState) => (`
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  <body>
    <div id="app-root">
      ${elementString}
    </div>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    <script src="/jakal-web-BETA/assets/browser.bundle.js"></script>
  </body>
</html>`);

function loadApp(req, res) {
  const context = {};
  const location = req.url;
  const RootElment = React.createElement(Router, { location, context });
  const elemString = ReactDOMServer.renderToString(RootElment);

  const preloadedState = {};
  const html = makeHtml(elemString, preloadedState);

  res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
  res.status(200).send(html);
}

export {
  loadApp,
}
