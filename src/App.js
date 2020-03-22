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


const List = (props) => {

  const Item = ({item}) => (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </div>
  )

  return (
    <div>
      {props.list.map(
        (item) => <Item key={item.objectID} item={item}/>
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

  const stories = [
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

  const searchedStories = stories.filter( 
      (story) => story.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} search={searchTerm}/>
      <hr/>
      <List list={searchedStories}/>
    </div>
  );
}

export default App;
