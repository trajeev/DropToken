import React from 'react'
import './App.css';
import Board from './components/board/board'
// import axios from 'axios'

function App() {

  // useEffect(() => {
  //   axios.get('https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production')
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  // },[])

  return (
    <Board />
  );
}

export default App;
