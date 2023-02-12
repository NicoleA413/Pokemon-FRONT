import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "../Cards/Cards";
import { setCurrentPage } from "../../redux/actions";
import style from "./Pages.module.css";

const Pages = ()=>{
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);

  const currentPage = useSelector((state) => state.currentPage);

  const [pokemonsPerPage] = useState(12);

  const handleClick = (event) => {     
    dispatch(setCurrentPage(Number(event.target.id)));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const pageNumbers = pages.map((number) => {
    if(currentPage === number){
      return (
        <li
        className={style.active}
        key={number}
        id={number}
        onClick={handleClick}
        >
        {number}
        </li>
      );
    }else{
      return (
        <li
        className={style.number}
        key={number}
        id={number}
        onClick={handleClick}
        >
        {number}
        </li>
      );
    };
  });
    
  const handleNext = () => {
    if (currentPage + 1 <= pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      return null;
    }
  };

  const handlePrev = () => {
    if (currentPage - 1 >= 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      return null;
    }
  };

  return (
    <div className={style.mainContainer}>
      <nav className={style.nav}>
        <ul className={style.paginado} name="top">
          <li>
            <button className={style.button} id="prev" onClick={handlePrev}>PREV</button>
          </li>
    
          {pageNumbers}
    
          <li>
            <button className={style.button} id="next" onClick={handleNext}>NEXT</button>
          </li>
        </ul>
      </nav>
      
      <div className={style.container}>
        {
          currentPage
          ? Cards(currentPokemons)
          : <img 
            src="https://www.ytgraphics.com/wp-content/uploads/2014/12/pokmeon.jpg" 
            alt="pokemon banner"
            id= "1"
            onClick={handleClick} 
          />
        }
      </div>
    
      <nav className={style.nav}>
        <ul className={style.paginado} name="bottom">
          <li>
            <button className={style.button} onClick={handlePrev}>PREV</button>
          </li>
    
          {pageNumbers}
    
          <li>
            <button className={style.button} id="next" onClick={handleNext}>NEXT</button>
          </li>
        </ul>
      </nav>
    </div>
  );
    
}

export default Pages;    