import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './CSS/IndividualPiece.css'

function IndividualPiece(){
   const { pieceId } = useParams()
   const [pieceInfo, setPieceInfo] = useState(null)
   const [selectedPieceImg, setSelectedPieceImg] = useState(null)

   useEffect(() => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${pieceId}`)
         .then(res => res.json())
         .then(data => {
            setPieceInfo(data);
            setSelectedPieceImg(data.primaryImage)
         });
   },[pieceId])

   if (!pieceInfo) return <h2>Loading...</h2>

   return (
      <>
         <div id="details">
            <h2>{pieceInfo.title}</h2>
            <h3>{pieceInfo.artistRole} {pieceInfo.artistDisplayName}</h3>
         </div>
         
         <div id="info">
            <p id="pieceDetails">{pieceInfo.objectName}, {pieceInfo.dimensions} made from {pieceInfo.medium}; in {pieceInfo.objectDate}, {pieceInfo.objectBeginDate}-{pieceInfo.objectEndDate}</p>
            <p id="authorDetails">Artist Info: {pieceInfo.culture}, {pieceInfo.period}, {pieceInfo.artistDisplayBio}</p>
            <p id="contributionDetails">Contributed: {pieceInfo.creditLine} to {pieceInfo.repository} in {pieceInfo.accessionYear}; {pieceInfo.objectURL}</p>
         </div>

         <div id="mainImg">
            <img src={selectedPieceImg} alt="Img Unavailable" />
         </div>

         <div id="sideImgs">
            <img src={pieceInfo.primaryImage} alt="Img Unavailable"
               onClick={() => setSelectedPieceImg(pieceInfo.primaryImage)} style={{ cursor: 'pointer' }}/>

            {pieceInfo.additionalImages?.map(img => (
               <img src={img} alt="Img Unavailable"
                  onClick={() => setSelectedPieceImg(img)} style={{ cursor: 'pointer' }}/>
            ))}
         </div>
      </>
   )
}

export default IndividualPiece