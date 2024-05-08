import React, { useEffect, useState } from "react";
//component
export const Search = () => {
  const [pokemon, setPokemon] = useState({});
  const [pokeName, setPokeName] = useState("");
  //submit button use state
  const [button, setButton] = useState(false);
  //pokemon image
  const [ability, setability] = useState([]);
  const [error, setError] = useState(false);
  const handleInputChange = (event) => {
    setPokeName(event.target.value);
  };
  function handleReset() {
    setPokeName("");
    setButton(false);
    setError(false);
    setPokemon({});
  }
  function handleSearch() {
    const fetchValue = async () => {
      try {
        const url = "https://pokeapi.co/api/v2/pokemon/";
        console.log(url);
        const mystring1 = pokeName.replace(/ /g, "");
        const mystring = mystring1.toLowerCase();
        const Response = await fetch(url + mystring);
        if (!Response.ok) {
          setError(true);
          return; //break point
        }
        const data = await Response.json();
        setPokemon(data);
        setButton(true);
        setError(false);
        //set the abilities
      } catch (error) {
        console.log(error);
        // Set the source (URL) of the image
      }
    };
    if (pokeName) {
      fetchValue();
    }
  }
  useEffect(() => {
    console.log(error);
  }, [error]);
  ///
  //IN for loop usestate will be sync due to which the state will always holds the last value
  // we create a let variable to take reference ability by for loop
  // then use state to update the whole ability list
  useEffect(() => {
    if ("abilities" in pokemon) {
      let abilityNames = [];
      pokemon.abilities.map((data) => {
        abilityNames = [...abilityNames, data.ability.name];
      });
      setability(abilityNames);
      // map{
      // setability([...ability, data.ability.name])
      // }
    }
  }, [pokemon]);

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
        onInput={handleInputChange}
      ></input>
      <button
        onClick={
          handleSearch
          // handleSearch--> short hand ---> "(event) => {handleSearch(event)}""
        }
      >
        Search
      </button>
      <button onClick={handleReset}>Clear</button>
      <div className="pokemon_img">
        {!error ? <img src={pokemon?.sprites?.back_default} /> : ""}
        {/* short circuit if breaks,to avoid runtime error pokemon?.sprites.back_default if its un */}
      </div>
      {error ? (
        <p>'Pokemon Not found'</p>
      ) : (
        <div className="container">
          <div>
            {button ? (
              <p>
                Name: <span id="pkname">{pokemon?.name}</span>{" "}
              </p>
            ) : (
              ""
            )}
            {button ? <p>Weight: {pokemon?.weight} </p> : ""}
            {button ? <p>Height: {pokemon?.height} </p> : ""}
            {button ? (
              <p>
                Abilities: <span id="ability">{ability.join(",")}</span>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
