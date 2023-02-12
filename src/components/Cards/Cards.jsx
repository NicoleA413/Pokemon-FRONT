import style from "./Cards.module.css";
import Card from "../Card/Card";

const Cards = (pokemons) => {

    return(
        <div className={style.cards}>
            {pokemons.map((poke) => {
                return <Card 
                    name = {poke.name}
                    image = {poke.image}
                    types = {poke.types}
                    key = {poke.id}
                    id = {poke.id}
                />
            })}
        </div>
    );
};
export default Cards;