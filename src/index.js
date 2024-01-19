import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import News from './components/News';

let list_items = [
  'business','entertainment','health','science','sports','technology'
]

function categoryGenerator(){
  let childs = []
  const genObj = {
    path: '/',
    element: <News key={"general"} category={"general"}/>
  }
  childs.push(genObj);
  list_items.forEach((elem) => {
    const obj = {
      path: elem,
      element: <News key={elem} category={elem}/>
    }
    childs.push(obj);
  });
  return childs;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App list_items={list_items}/>,
    children: categoryGenerator()
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
