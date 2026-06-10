import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function SearchResults (){
   const { searchKey } = useParams()
   const [resultList, setResultList] = useState([])

   useEffect(() => {
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchKey}`)
         .then(res => res.json())
         .then(data => setResultList(data.objectIDs))
   } ,[searchKey])

   return(
      <div id="searchView">
         <div id="searchedKey">
            <h3>
               Results for <span id="key">{searchKey}</span>
            </h3>
         </div>

         <div id="listContainer">
            {resultList.length === 0 ? (
               <h2>Loading...</h2>
            ) : (
               <ul id="resultList">
                  {}
               </ul>
            )}
         </div>
      </div>
   )
}

export default SearchResults