import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './CSS/SearchResults.css'

function SearchResults (){
   const navigate = useNavigate()
   const { searchKey } = useParams()
   const [idList, setIdList] = useState([])
   const [resultList, setResultList] = useState([])
   const [timedOut, setTimedOut] = useState(false)
   const cancelledRef = useRef(false);

   useEffect(() => {
      setIdList([]);
      setResultList([]);
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchKey}`)
         .then(res => res.json())
         .then(data => setIdList((data.objectIDs || []).slice(0, 60)))
   }, [searchKey])

   useEffect(() => {
      cancelledRef.current = false;
      run(cancelledRef, idList, setResultList);
      return () => {
         cancelledRef.current = true;
      };
   }, [idList]);

   useEffect(() => {
      const timer = setTimeout(() => {
         setTimedOut(true);
      }, 3000);
      return () => clearTimeout(timer);
   }, []);

   return(
      <div id="searchView">
         <div id="searchedKey">
            <h3>
               Results for <span id="key">{searchKey} </span>
            </h3>
         </div>

         <div id="listContainer">
            {idList.length === 0 ? (
               timedOut ? (
                  <h2>No Results Found</h2>
               ) : (
                  <h2>Loading...</h2>
            )) : (
               <ul id="resultList">
                  {resultList.map(result => (
                     <li className="result" key={result.id} onClick={() => {
                        navigate(`/IndividualPiece/${result.id}`)}}
                        style={{ cursor: 'pointer' }}>
                        {result.title}
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   )
}

async function run(cancelledRef, idList, setResultList) {
   for (let i = 0; i < 3 && i * 10 < idList.length; i++) {
      if (cancelledRef.current) return;

      await fetchMany(10 * i, idList, setResultList);
      await new Promise(r => setTimeout(r, 3000));
   }
}

async function fetchMany(startIndex, idList, setResultList) {
   const batch = idList.slice(startIndex, startIndex + 10);

   const results = await Promise.all(
      batch.map(async (id) => {
         try {
            const res = await fetch(
               `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            const data = await res.json();

            if (!data || !data.title) return null;

            return { id, title: data.title };
         } catch (err) {
            console.error(`Failed to fetch object ${id}:`, err);
            return null;
         }
      })
   );
   setResultList(prev => [...prev, ...results.filter(Boolean)]);
}

export default SearchResults