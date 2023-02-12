import { NavLink } from 'react-router-dom';
import style from "./Landing.module.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";

const Landing = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch]);
    
    return (
        <div className={style.background}>
            <div className={style.container}>
                <h1 className={style.title}>Pokemon PI</h1>
                <NavLink to='/pokemons'><button className={style.button}>HOME</button></NavLink> 
            </div>
            
        </div>
    );
};

export default Landing;