import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';


const App = ()=> {
  const APP_ID = 'c279f41f';
  const APP_KEY = '2abd79c9c83e7ed2bec1d599b43572b0';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chiken');

  useEffect(()=> {
    getRecipes();
  }, [query])

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(search);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input value={search} type="text" className="search-bar" onChange={updateSearch}/>
        <button type="submit" className="search-button" >Search</button>
      </form>
      <div className="one">
              {recipes.map(recipe => (
                  <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} 
                  image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}
                />
          ))}
      </div>
    </div>
  )
}

export default App;
