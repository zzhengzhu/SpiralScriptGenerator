import React from 'react';
import SpiralTextNode from './SpiralTextNode';

const App = () => {
  const texts = [
    { id: '1', text: 'eralogos',
      flip: 1, x: 0, y: 0, density: 0.3},
    { id: '2', text: '', 
      flip: 1, x: 500, y: 0, density: 0.2},
    { id: '3', text: '', 
      flip: -1, x: 1000, y: 0, density: 0.2},
    // { id: '4', text: 'The genres of their music includes pop, rock, jazz, classical, folk and nursery rhymes. Many languages, including Latin, French, Italian, English and Arabic, were used in the lyrics. ', 
    //   flip: -1, x: 1500, y: 0}
  ];

  return (
    <div>
      {texts.map(text => (
        <SpiralTextNode key={text.id} textData={text} />
      ))}
    </div>
  );
};

export default App;
