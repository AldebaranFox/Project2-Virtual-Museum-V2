import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import './CSS/Banner.css'

function Banners (){
   const [featuredPieces, setFeaturedPieces] = useState([])
   const location = useLocation()
   const navigate = useNavigate();

   useEffect(() => {
   async function loadPieces() {
      const pieces = [];

      while (pieces.length < 2) {
         const potentialPiece = await getFeaturedPiece(Math.floor(Math.random() * 501733) + 1);
         if (potentialPiece) {
            pieces.push(potentialPiece);
         }
      }
      setFeaturedPieces(pieces);
   }
   loadPieces();
   }, [location.pathname]);

   if (featuredPieces.length < 2) {
      return (
         <div id="bannerContainer">
            <div id="LBanner" className="Banner">
               <h2>Featured Piece</h2>
               <h3>Loading...</h3>
            </div>

            <div id="RBanner" className="Banner">
               <h2>Featured Piece</h2>
               <h3>Loading...</h3>
            </div>
         </div>
      )
   }

   return(
      <div id="bannerContainer">
         <div id="LBanner" className="Banner"
         onClick={() => {
            navigate(`/IndividualPiece/${featuredPieces[0].id}`)}
         }
         style={{ cursor: 'pointer' }}>
            <h2>Featured Piece</h2>
            <h3>{featuredPieces[0].title}</h3>
            <p>{featuredPieces[0].author}</p>
            <img src={featuredPieces[0].img} alt="Img Unavailable"/>
         </div>

         <div id="RBanner" className="Banner"
         onClick={() => {
            navigate(`/IndividualPiece/${featuredPieces[0].id}`)}
         }
         style={{ cursor: 'pointer' }}>
            <h2>Featured Piece</h2>
            <h3>{featuredPieces[1].title}</h3>
            <p>{featuredPieces[1].author}</p>
            <img src={featuredPieces[1].img} alt="Img Unavailable"/>
         </div>
      </div>
   )
}


async function getFeaturedPiece(pieceId){
   const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${pieceId}`
   );
   const json = await response.json();

   const img = json.primaryImageSmall?.trim() || json.primaryImage;

   //! Skip pieces without imgs
   if (!img) return null;

   return {
      id: pieceId,
      title : json.title,
      author : `${json.artistRole} ${json.artistDisplayName}`,
      img : img
   }
}

export default Banners