import React from 'react';
import Home from './Home';
import nodeSafeWindow from './NodeSafeWindow';

export default () => {
  const data = nodeSafeWindow.__INITIAL__DATA__
  const [route, setRoute] = React.useState<string>(nodeSafeWindow.location.href);
  const [clientData, setClientData] = React.useState<string>('nothing fetched yet');
  React.useEffect(() => {
    nodeSafeWindow.addEventListener('popstate', () => {
      console.log('poppin');
      setRoute(nodeSafeWindow.location.href);
    })
  }, []);
  return (
    <div>
      <Home name="This is from a prop !" />
      <br/>
      current route: {route}
      <br/>
      <button
        onClick={() => {
          setRoute(`${window.location.protocol}//${window.location.host}/nofetch`);
          nodeSafeWindow.history.pushState(null, '', '/nofetch')
        }}
      >
        client reroute
      </button>
      <br/>
      <button
        onClick={() => {
          nodeSafeWindow.location.href = '/nofetch'
        }}
      >
        server reroute
      </button>
      <br/>
      async data: {data}
      <br />
      <button
        onClick={() => {
          fetch('http://jsonplaceholder.typicode.com/posts/1')
            .then(resp => {
              return resp.text()
            })
            .then((newClientData) => {
              setClientData(newClientData);
            });
        }}
      >
        fetch from client
      </button>
      async from client: {clientData}
    </div>
  );
};