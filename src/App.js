import React from 'react';
import logo from './logo.svg';
import './App.css';


const useSemiPersistentState = (key, initialState = "") => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  )

  React.useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])

  return [value, setValue]
}


const List = ({ list, onRemoveItem}) => {

  const Item = ({ item, onRemoveItem}) => (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button
        onClick={() => onRemoveItem(item)}
      > Remove
      </button>
    </div>
  )

  return (
    <div>
      {list.map(
        (item) => (
          <Item 
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem} 
          />
        )
      )}
    </div>
  )
}

const Search = ({search, onSearch}) => {
  
  return(
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" 
             type="text" 
             onChange={onSearch} 
             value={search}
      />
    </>
  )
}

const App = () => {

  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search")
  const [stories, setStories] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false)

  React.useEffect( () => {
    setIsLoading(true);
    getAsyncStories().then( 
      (result) => {
        setStories(result.data.stories)
        setIsLoading(false)
      }).catch( () => setIsError(true));
    },[]
  )

  const searchedStories = stories.filter( 
      (story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const getAsyncStories = () => {
    return new Promise(resolve =>
      setTimeout( () => resolve({ data: {stories: initialStories} }), 2000)
      );
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => story.objectID != item.objectID)
    setStories(newStories)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} search={searchTerm}/>
      <hr/>

      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) :
        <List list={searchedStories} onRemoveItem={handleRemoveStory} />
      }
    </div>
  );
}

export default App;
