import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

const URL = 'http://hn.algolia.com/api/v1/search';

function App() {
    
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);
      setStories(result.data.hits);
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>Fetch Stories</button>
      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map(story => 
          <li key={story.objectID}>
            <a href={story.url}>{ story.title }</a>
          </li>  
        )}
      </ul>
    </div>
  );
}

// export function Search({ value, onChange, children }) {
//   return (
//     <div>
//       <label htmlFor='search'>{children}</label>
//       <input
//         id='search'
//         type='text'
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   )
// }

export default App;
