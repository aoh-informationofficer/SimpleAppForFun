import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';
import './globalStyle.css';
import Title from './components/Title';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPossibleTroubleshootingPages() {
      try {
        const data = await invoke('fetchPossibleTroubleshootingPages');
        setData(data);
      } catch(err) {
        console.error(err.message)
      } 
    }
    fetchPossibleTroubleshootingPages();
  }, []);

  return (
    <>
      <Title>Possible Troubleshooting Solutions</Title>
      <table>
        <TableHeader>
          <th>#</th>
          <th>Title</th>
        </TableHeader>
        <TableBody data={data} />
      </table>
    </>
  );
}

export default App;
