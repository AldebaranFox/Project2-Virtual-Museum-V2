import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Header.css'

function Header() {
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState('');

  const handleSearch = () => {
    if(searchKey){
      navigate(`/SearchResults/${searchKey}`)
      setSearchKey('')
    }
  }

  return (
    <header id="header">
      <h1 id="welcome">Welcome to the Art Museum</h1>
      <button onClick={() => navigate('/')}>Home</button>
      <input
        type="text"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyDown={(e) => {if (e.key === 'Enter') {
          handleSearch()};}}
      />
      <button onClick={handleSearch}>Search</button>
    </header>
  );
}

export default Header;