import * as React from 'react';
import './App.css';
import Home from './components/Home'
import Upload from './components/Upload'
import Result from './components/Result'
import Stream from './components/Stream'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='Upload' element={<Upload/>}/>
      <Route path='Home' element={<Home/>}/>
      <Route path="Result" element={<Result/>}/>
      <Route path="Stream" element={<Stream/>}/>
    </Routes>
  );
}

export default App;
