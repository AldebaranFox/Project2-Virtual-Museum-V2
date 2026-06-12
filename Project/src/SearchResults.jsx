import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import './CSS/SearchResults.css'

function SearchResults (){
   const navigate = useNavigate()
   const { searchKey } = useParams()
   const [idList, setIdList] = useState([])
   const [resultList, setResultList] = useState([])
   const [loading, setLoading] = useState(false)
   const cancelledRef = useRef(false);

   useEffect(() => {
      setLoading(true);
      setIdList([]);
      setResultList([]);
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchKey}`)
         .then(res => res.json())
         .then(data => setIdList((data.objectIDs || []).slice(0, 60)))
         .then(setLoading(false))
   }, [searchKey])

   useEffect(() => {
      setLoading(true)
      cancelledRef.current = false;

      run(cancelledRef, idList, setResultList);

      setLoading(false)
      return () => {
         cancelledRef.current = true;
      };
   }, [idList]);

   return(
      <div id="searchView">
         <div id="searchedKey">
            <h3>
               Results for <span id="key">{searchKey} </span>
            </h3>
         </div>

         <div id="listContainer">
            {loading ? (
               <h2>Loading...</h2>
            ) : idList.length === 0 ? (
               <h2>No Results Found</h2>
            ) : (
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