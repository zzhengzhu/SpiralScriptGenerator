import React from 'react';
import NomaiMatrix from './NomaiMatrix';

function App() {
  const [matrix] = React.useState([
    "Central Idea 1 Central Idea 2 Central Idea 3 Central Idea 4 Central Idea 5 Central Idea 6/////",
    "Branch One extends this idea",
    "Branch Two explores another aspect",
    "Branch Three offers a contrast"
  ]);

  return (
    <div className="App">
      <h1>Nomai Style Text Branching</h1>
      <NomaiMatrix matrix={matrix} />
    </div>
  );
}

export default App;
