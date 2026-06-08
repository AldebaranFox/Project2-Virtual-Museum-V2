import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ search, setSearch }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(search);

  const handleSearch = () => {
    setSearch(inputValue);
    navigate('');
  };

  return (
    <header id="header">
      <h1 id="welcome">Welcome to the Art Museum</h1>
      <button onClick={() => navigate('/')}>Home</button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {if (e.key === 'Enter') {
          handleSearch()};}}
      />
      <button onClick={handleSearch}>Search</button>
    </header>
  );
}

export default Header;