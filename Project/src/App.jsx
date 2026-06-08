import { Routes, Route } from 'react-router-dom'
import {useState} from 'react'

import Header from './Header'
import Banners from './Banners'
import Home from './Home'
import DepartmentView from './DepartmentView'
import IndividualPiece from './IndividualPiece'
import './CSS/App.css'

function App() {
  const [search, setSearch] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [imgToggle, setImgToggle] = useState(false);

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Banners />
      <Routes>
        <Route path="/" element={
          <Home
            departmentList={departmentList}
            setDepartmentList={setDepartmentList}
            imgToggle={imgToggle}
            setImgToggle={setImgToggle}
          />}
        />
        <Route path="/DepartmentView/:departmentId" element={<DepartmentView departmentList={departmentList} imgToggle={imgToggle}/>} />
        <Route path="/IndividualPiece/:pieceId" element={<IndividualPiece />}/>
      </Routes>
    </>
  )
}

export default App
