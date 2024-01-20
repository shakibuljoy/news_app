
import './App.css';
import LoadingBar from 'react-top-loading-bar';
import { MyContext } from './MyContext';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

export default function App(props) {
  const [progress, setProgress] = useState(30);
  return (
      <>
      <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar list_items={props.list_items} />
      <MyContext.Provider value={{setProgress: setProgress}}>
        <Outlet/>
      </MyContext.Provider>
      </>
  )
}

App.defaultProps = {
  list_items: null,
  category: 'Science'
}


