import React from 'react';
import Cart from './cart'
import MyCart from './myCart'
// import NewCart from './newCart'
// import MemoTest from './test/memoTest'
// import ContextTest from './test/contextTest'
// import ReducerTest from './test/reducerTest'
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Cart />
      <MyCart />
      {/* <NewCart /> */}
      {/* <MemoTest />
      <ContextTest /> */}
      {/* <ReducerTest /> */}
    </div>
  );
}

export default App;
