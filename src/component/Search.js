import React, { useEffect, useState } from "react";
//component
export const Search = () => {
  const [pokemon, setPokemon] = useState({});
  const [pokeName, setPokeName] = useState();
  //submit button use state
  const [button, setButton] = useState(false);
  //clear button use state
  const [clear, setClear] = useState(false);
  //pokemon image
  const myImage = document.getElementById("myImage");

  //const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const handleInputChange = (event) => {
    setPokeName(event.target.value);
    console.log(event.target.value);
  };
  useEffect(() => {
    const fetchValue = async () => {
      try {
        const Response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/bulbasaur"
        );
        if (!Response.ok) {
          throw new Error("Could not find");
        }
        const data = await Response.json();
        console.log(data);
        setPokemon(data);
      } catch (error) {
        console.log(error);
        // Set the source (URL) of the image
      }
    };
    fetchValue();
  }, []);
  //function
  //viki
  //jsx code html+javascript
  return (
    <div className="data">
      <input
        type="text"
        id="pokemonName"
        placeholder="Enter the pokemon Name?"
        value={pokeName}
        onChange={handleInputChange}
      ></input>
      <button
        onClick={(event) => {
          setButton(true);
        }}
      >
        Search
      </button>
      <button
        onClick={(event) => {
          setClear(true);
        }}
      >
        Clear
      </button>

      <div className="pokemon_img">
        {button ? <img src={pokemon.sprites.back_default} /> : ""}
      </div>
      <div>
        {button ? <p>Name: {pokemon.name} </p> : ""}
        {button ? <p>Weight: {pokemon.weight} </p> : ""}
        {button ? <p>Height: {pokemon.height} </p> : ""}
        {button ? <p>weight: {pokemon.weight} </p> : ""}
        {clear ? setPokemon({}) : " "}
      </div>
    </div>
  );
};
