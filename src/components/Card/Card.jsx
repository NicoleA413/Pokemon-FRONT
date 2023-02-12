import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = ({ name, image, types, id })=> {
  return (
    <div className={style.card} name={types[0]}>
      <Link to={`/pokemons/${id}`} className={style.link}>
        <div name={types[0]} className={style.title}>{name[0].toUpperCase() + name.slice(1)}</div>
        <img src={image} alt="imagen card" className={style.image}/>
        <div>
          {types.map((type) => (
            <div key={id + type} name={type} className={type}>
              {type.toUpperCase()}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}

export default Card;