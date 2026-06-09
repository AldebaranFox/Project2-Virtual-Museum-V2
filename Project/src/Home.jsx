import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ departmentList, setDepartmentList, imgToggle, setImgToggle}) {
   const navigate = useNavigate();

   useEffect(() => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/departments`)
         .then((res) => res.json())
         .then((data) => setDepartmentList(data.departments));
   }, []);

   return (
      <div id="homeView">
         <div id="about">
            <p id="aboutText">
               This is a website that allows you to navigate a virtual art museum. With access to 19 individual departments where each will contain up to 15 distinct art pieces.
               <br/>All sources generated from https://metmuseum.github.io/
            </p>
         </div>

         <div id="departmentDiv">
            <p id="departmentTitle">Departments</p>

            <div className="toggleContainer">
               <label className="toggle">
                  <input
                     type="checkbox"
                     id="imgToggle"
                     checked={imgToggle}
                     onChange={() => setImgToggle(prev => !prev)}
                  />
                  <span className="slider"></span>
               </label>
               <span>Entries without images</span>
            </div>

            <br/>
            <ul id="departmentList">
               {departmentList.map((department) => (
                  <li
                     key={department.departmentId}
                     className="DepartmentItem"
                     onClick={() => {
                        navigate(`/DepartmentView/${department.departmentId}`)}
                     }
                     style={{ cursor: 'pointer' }}
                  >
                     {department.displayName}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )

}

export default Home;

