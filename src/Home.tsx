import React from 'react';

export default ({ name }: { name: string}) => {
  const [num, setNum] = React.useState(0);
  return (
    <>
      <h1>Inner component: {name}</h1>
      <button
        onClick={() => setNum(num+1)}
      >
        inc {num}
      </button>
    </>
  );
};