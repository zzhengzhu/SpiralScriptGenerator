import React from 'react';
import SpiralTextNode from './SpiralTextNode';

const App = () => {
  const texts = [
    { id: '1', text: 'Root Node', flip: 1, parent: null },
    { id: '2', text: 'First Child', flip: 1, parent: '1' },
    { id: '3', text: 'S e c o n d C h i l d', flip: 1, parent: '2' },
    { id: '4', text: 'Child of Second Child', flip: -1, parent: '3' }
  ];

  const rootText = texts.find(t => t.parent === null);

  return (
    <div>
      <SpiralTextNode key={rootText.id} textData={rootText} texts={texts} />
    </div>
  );
};

export default App;