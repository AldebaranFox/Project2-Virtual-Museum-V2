import { Routes, Route } from 'react-router-dom'
import {useState} from 'react'

import Header from './Header'
import Banners from './Banners'
import Home from './Home'
import DepartmentView from './DepartmentView'
import IndividualPiece from './IndividualPiece'
import SearchResults from './SearchResults'
import './CSS/App.css'

function App() {
  const [imgToggle, setImgToggle] = useState(false);

  return (
    <>
      <Header />
      <Banners />
      <Routes>
        <Route path="/" element={
          <Home
            imgToggle={imgToggle}
            setImgToggle={setImgToggle}
          />}
        />
        <Route path="/DepartmentView/:departmentId/:departmentName" element={<DepartmentView imgToggle={imgToggle}/>} />
        <Route path="/IndividualPiece/:pieceId" element={<IndividualPiece />}/>
        <Route path="/SearchResults/:searchKey" element={<SearchResults />}/>
      </Routes>
    </>
  )
}

export default App
