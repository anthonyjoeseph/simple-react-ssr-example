import fetch from 'node-fetch';
import express from 'express';
import React from 'react';
import App from '../src/App';
import generateClient from './GenerateClient';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static('./build', {
  index: false,
}));

app.use('/server-build', express.static('./server-build'));

app.get('*', async (req, res) => {
  const globalState = req.url?.includes('nofetch')
    ? "no fetch"
    : await fetch('https://reqres.in/api/users?page=2')
        .then(resp => resp.text())
        .then(text => `fetched: ${text}`);
  try {
    const clientString = await generateClient(
      <App
        initialUrl={req.url}
      />,
      globalState,
    )
    return res.send(clientString);
  } catch (untypedErr) {
    const err: NodeJS.ErrnoException = untypedErr;
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
});

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});