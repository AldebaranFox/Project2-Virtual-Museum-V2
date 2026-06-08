import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './CSS/DepartmentView.css'

function DepartmentView({departmentList, imgToggle}) {
   const { departmentId } = useParams()
   const [piecesList, setPiecesList] = useState([]);

   //Every 5s add 10 items
   useEffect(() => {
      const timers = [];

      for (let i = 0; i < 6; i++) {
         const timer = setTimeout(() => {
            getArtPieces(10 * i, 10 * (i + 1), departmentId, imgToggle, setPiecesList);
         }, i * 3000);
         timers.push(timer);
      }
      return () => timers.forEach(clearTimeout);
   }, [departmentId, imgToggle]);

   const department = departmentList.find(department => department.departmentId === Number(departmentId));

   return (
      <>
         <h2 id="departmentName">
            Welcome to {department.displayName}
         </h2>

         <div id="piecesDiv">
            <ul id="piecesList">
               {piecesList.map((pieceInfo) => (
                  <li key={pieceInfo.id}>
                     <div className="pieceHeader">
                        <p className="pieceName">{pieceInfo.title}</p>
                        <p className="pieceAuthor">{pieceInfo.author}</p>
                     </div>

                     <div className="pieceImg">
                        <img src={pieceInfo.img} alt="Image unavailable" />
                     </div>

                     <div className="descriptionContainer">
                        <p className="description">{pieceInfo.description}</p>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </>
   )
}


//* Fetch # art piece Ids for the selected department
async function getArtPieces(firstItemIndex, itemCount, selectedDepartmentId, imgToggle, setPiecesList){
   const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${selectedDepartmentId}`
   );
   const json = await response.json();

   const piecesIdList = (json.objectIDs || []).slice(firstItemIndex, itemCount);
   generatePiecesList(piecesIdList, imgToggle, setPiecesList);
}

//* Generates the list of art pieces
async function generatePiecesList(piecesIdList,imgToggle,setPiecesList) {
   // makes all # piece data requests in parallel
   const piecesResult = await Promise.all(
      piecesIdList.map(id => getPieceInfo(id, imgToggle))
   );
   // Filter out null entries (generated due to no img)
   const piecesData = piecesResult.filter(x => x !== null);

   setPiecesList(prev => [...prev, ...piecesData]);
}

//* Retrieve and return specified art piece's information
async function getPieceInfo(pieceId, imgToggle) {
   const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${pieceId}`
   );
   const json = await response.json();

   const img = json.primaryImageSmall?.trim() || json.primaryImage;

   //! Skip pieces without imgs (when toggle off)
   if (!imgToggle){
      if (!img) return null;
   }

   return {
      id: pieceId,
      title : json.title,
      author : `${json.artistRole} ${json.artistDisplayName}`,
      img : img,
      description : `${json.objectBeginDate} - ${json.objectEndDate}\n` + `${json.medium}\n` + `${json.creditLine}\n` + `${json.repository}`
   }
}


export default DepartmentView