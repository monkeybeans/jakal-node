import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from 'serialize-javascript';

import settings from '../settings';
import { getFreshSuggestions } from '../db/handlers/suggestions';
import { getEndorsedSuggestions } from '../db/handlers/voting-utils';
import LoadRouter from '../../../app/src/routes/LoadRouter.server';

const RANDOM = Math.floor(Math.random() * 99999);

const makeHtml = (elementString, preloadedState) => (`
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
  </head>
  <body>
    <div id="app-root">${elementString}</div>
    <script>window.__PRELOADED_STATE__ = ${serialize(preloadedState)}</script>
    <script src="/jakal/assets/browser.bundle.js?${RANDOM}"></script>
  </body>
</html>`);

async function loadApp(req, res) {
  const context = {};
  const location = req.url;

  let suggestions = await getFreshSuggestions({ settings, today: new Date() });
  let endorsed = await getEndorsedSuggestions();

  const preloadedState = {
    history: { endorsed },
    dynamics: { suggestions }
  };

  const serverRouter = LoadRouter(preloadedState);

  const RootElment = React.createElement(serverRouter.getRouter(), { location, context });
  const elemString = ReactDOMServer.renderToString(RootElment);

  const html = makeHtml(elemString, serverRouter.getFinalState());

  res.setHeader( 'Content-Type', 'text/html; charset=utf-8' );
  res.status(200).send(html);
}

export {
  loadApp,
}
