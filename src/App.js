import React from 'react';
import logo from './logo.svg';
import './App.css';


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

const Search = (props) => {
  
  return(
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" 
             type="text" 
             onChange={props.onSearch} 
             value={props.searchTerm}
      />
      <p>
        Searching for <strong>{props.searchTerm}</strong>
      </p>
    </div>
  )
}

const App = () => {

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || "React"
  )

  React.useEffect( () => {
    localStorage.setItem('search',searchTerm)
  }, [searchTerm])

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
