import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reack hooks');
  const inputSearchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getResults = async () => {
    console.log('Samiksha meri biwi hai')
    setLoading(true);
    try{
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    }
    catch(err){
      setError(err)
    }
    setLoading(false);    
  };
  const getSearchResults = event => {
    event.preventDefault();
    getResults();
  }
  useEffect(() => {
      getResults();
  }, []);
const handleClearSearch = () => {
  setQuery("");
  inputSearchRef.current.focus();
}
  return (
    <div className='App' id="container">
      <span className='Custom-app-header'>Search using React Hooks</span>
      <form onSubmit={getSearchResults} className='formHeader'>
        <input type="text" onChange={event => setQuery(event.target.value)} value={query} ref={inputSearchRef}></input>
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      {loading? <div>Loading Results ...</div> : <ul>
        {results.map(result => (
          <li key={result.objectID}><a href={result.url}>{result.title}</a></li>
        ))}
      </ul>}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default App;
