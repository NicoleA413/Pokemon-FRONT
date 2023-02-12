import React, { useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailFromState, deletePokemon, getPokemons } from "../../redux/actions";
import style from "./Detail.module.css";
import Pikachu from "../../styles/images/pikachu.png";
import Eevee from "../../styles/images/Eevee.png";

const Detail = () => {
    const dispatch = useDispatch();
    
    const { id } = useParams();
  
    const pokemonDetail = useSelector((state) => state.detail);
  
    const allPokemons = useSelector((state) => state.pokemons);
  
    const history = useHistory();
  
    useEffect(() => {
      if (allPokemons.length) {
        dispatch(getDetailFromState(id));
      } else {
        dispatch(getDetail(id));
      }
    }, [dispatch, id, allPokemons.length]);
  
    const handlerDelete = () => {
      dispatch(deletePokemon(id));
      alert("Pokemon eliminado con éxito");
      history.push("/pokemons");
      dispatch(getPokemons());
    };

    return (
        <div className={style.mainContainer}>
            {pokemonDetail.length ? (
                <div className={style.container}>
                    <div className={style.main}>
                        <div className={style.imageContainer}>
                            <img src={pokemonDetail[0].image} className={style.image} alt="imagen-del-pokemon"/>
                        </div>

                        <div className={style.name}>
                            {pokemonDetail[0].name[0].toUpperCase() + pokemonDetail[0].name.slice(1)}
                        </div>

                        <div className={style.typesContainer}>
                            {pokemonDetail[0].types.map((t) => (
                                <div className={style.types} name={t} key={pokemonDetail[0].name + t}>{t.toUpperCase()}</div>
                            ))}
                        </div>

                        <div className={style.id}>ID #{pokemonDetail[0].id}</div>
                    </div>
                    
                    <div className={style.stats}>

                        <div className={style.statsRow}>
                            <div className={style.statsTitle}>Hp</div>
                            <div className={style.statsNumbers}>{pokemonDetail[0].hp}</div>

                            <div>
                                <div className={style.graph} style={{width: `${(pokemonDetail[0].hp / 150) * 100}%`}}></div>
                             </div>
                        </div>

                        <div className={style.statsRow}>
                            <div className={style.statsTitle}>Attack</div>
                            <div className={style.statsNumbers}>{pokemonDetail[0].attack}</div>

                            <div>
                                <div className={style.graph} style={{width: `${(pokemonDetail[0].attack / 150) * 100}%`}}></div>
                            </div>
                        </div>

                        <div className={style.statsRow}>
                            <div className={style.statsTitle}>Defence</div>
                            <div className={style.statsNumbers}>{pokemonDetail[0].defence}</div>

                            <div>
                                <div className={style.graph} style={{width: `${(pokemonDetail[0].defence / 150) * 100}%`}}></div>
                            </div>
                        </div>

                        <div className={style.statsRow}>
                            <div className={style.statsTitle}>Speed</div>
                            <div className={style.statsNumbers}>{pokemonDetail[0].speed}</div>

                            <div>
                                <div className={style.graph} style={{width: `${(pokemonDetail[0].speed / 150) * 100}%`}}></div>
                            </div>
                        </div>

                    </div>

                    <div className={style.body}>
                        <div>
                            <div>Height</div>
                            <div>{pokemonDetail[0].height / 10} m</div>  
                        </div>
                        
                        <div>
                            <div>Weight</div>
                            <div>{pokemonDetail[0].weight / 10} kg</div>
                        </div>
                    </div>

                    {pokemonDetail[0].created && (
                        <div className={style.buttonsContainer}>
                            <NavLink to={`/pokemons/edit/${id}`}><button className={style.buttons} id="edit">Edit Pokemon</button></NavLink>

                            <button className={style.buttons} id="delete" onClick={(e) => handlerDelete(e)}>Delete Pokemon</button>
                        </div>
                    )}

                    <img src={Pikachu} className={style.Pikachu} alt="Pikachu"/>
                    <img src={Eevee} className={style.Eevee} alt="Eevee"/>
                </div>
            ) 
            : (
                <div>
                    <img className={style.pokeball} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png" alt="pokeball"/>
                </div>
            )}
        </div>
    );
};

export default Detail;