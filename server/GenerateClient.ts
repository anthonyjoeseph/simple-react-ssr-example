import serialize from 'serialize-javascript';
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (
  App: string | React.FunctionComponent | React.ComponentClass,
  globalState: string | object,
): Promise<string> => new Promise((resolve, reject) => {
  const app = ReactDOMServer.renderToString(React.createElement(App));

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    const clientString = `
    <!DOCTYPE html>
    <html>
      <head>
        <script>
        GLOBAL_STATE = ${serialize(globalState)};
        </script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Hello Bulma!</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
      </head>
      <body>
        <div id="root">${app}</div>
        <script src="entry.js"></script>
      </body>
    </html>
    `
    resolve(clientString);
  });
}) 

/*
const clientString = data
.replace(
  '<div id="root"></div>', 
  `<div id="root">${app}</div>`,
)
.replace(
  '<head>',
  `<head><script>window.__INITIAL__DATA__ = ${serialize(globalState)}</script>`,
);

*/