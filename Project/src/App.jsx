import { Routes, Route } from 'react-router-dom'
import {useState} from 'react'

import Header from './Header'
import Home from './Home'
import DepartmentView from './DepartmentView'
import './CSS/App.css'

function App() {
  const [search, setSearch] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [imgToggle, setImgToggle] = useState(false);

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={
          <Home search={search}
            departmentList={departmentList}
            setDepartmentList={setDepartmentList}
            imgToggle={imgToggle}
            setImgToggle={setImgToggle}
          />}
        />
        <Route path="/DepartmentView/:departmentId" element={<DepartmentView departmentList={departmentList} imgToggle={imgToggle}/>} />
      </Routes>
    </>
  )
}

export default App
