import React from 'react';
import Home from './Home';
import window from './NodeSafeWindow';

export default ({
  initialUrl,
}: {
  initialUrl: string;
}) => {
  const data = window.__INITIAL__DATA__
  const [route, setRoute] = React.useState<string>(initialUrl);
  const [clientData, setClientData] = React.useState<string>('nothing fetched yet');
  React.useEffect(() => {
    window.addEventListener('popstate', () => {
      console.log('poppin');
      setRoute(window.location.pathname);
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
          setRoute(`/nofetch`);
          window.history.pushState(null, '', '/nofetch')
        }}
      >
        client reroute
      </button>
      <br/>
      <button
        onClick={() => {
          window.location.href = '/nofetch'
        }}
      >
        server reroute
      </button>
      <br/>
      async data: {data}
      <br />
      <button
        onClick={() => {
          fetch('https://reqres.in/api/users?page=2')
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