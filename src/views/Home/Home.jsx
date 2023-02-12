import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterCreated, filterByType, filterByName, filterByAttack, setCurrentPage } from "../../redux/actions";
// import { NavLink } from 'react-router-dom';
import Pages from "../../components/Pages/Pages";
import style from "./Home.module.css";

const Home = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const allPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);

    const [typeSelect, setTypeSelect] = useState({
         type: [], 
         origin: [], 
    });

    const [order, setOrder] = useState("");

    useEffect(()=>{
        if(!allPokemons.length){
            dispatch(getPokemons());
            dispatch(getTypes()); 
        }
    },[dispatch, allPokemons.length]);

//--------------------------------------------------HANDLERS--------------------------------------------

    let disabledSelect = !(!typeSelect.type.length) || !(!typeSelect.origin.length);

    const handleFilterCreated = (event) => {
        event.preventDefault();
        const value = event.target.value;

        dispatch(filterCreated(value));

        setTypeSelect({
            ...typeSelect,
            origin: [value],
        });
    };

    const handleFilterType = (event) => {
        const value = event.target.value

        if (value === "all") {
            dispatch(getPokemons());
        } else {
            dispatch(filterByType(value));
        };

        setTypeSelect({
            ...typeSelect,
            type: [value],
        });
    };

    const handleDeleteType = (event) => {

        setTypeSelect({
            type: [],
            origin: [],
        })

        window.location.reload();
        dispatch(getPokemons());
    }

    const handleFilterOrder = (event) => {
        const value = event.target.value

        if (value === "asc" || value === "des") {
            event.preventDefault();

            dispatch(filterByName(value));
            setCurrentPage(1);
            setOrder(`Ordenado por nombre ${value}`)
        }
        if (value === "strongest" || value === "weakest") {
            event.preventDefault();

            dispatch(filterByAttack(value));
            setCurrentPage(1);
            setOrder(`Ordenado por ${value}`)
        }

        if (value === "def") {
            event.preventDefault();

            dispatch(getPokemons());
            setCurrentPage(1);
            setOrder("Sin orden");
        }

        if (order.length < 0) {
            setOrder("")
        }
    }

//----------------------------------------------------VIEW----------------------------------------------

    try{
        if(error){
            return(
                <div className={style.error}>
                <h2>Oops, algo ha salido mal...</h2>
                <p>{error}</p>
                <button className={style.errorButton} onClick={handleDeleteType}>Return to Home</button>
                </div>
            )
        }
        return (
            <div className={style.mainContainer}>
                {/* <NavLink to="/"><button className={style.buttonLan}>LANDING</button></NavLink> */}
                
                <div className={style.titleBack}><h2 className={style.title}>My Pokedex</h2></div>

                <div className={style.container}>       
                    <p className={style.FilterP}>Filter by</p>
                    <div className={style.selectContainer}>
                        <div className={style.orderContainer}>
                            <p className={style.filterTitle}>Order by</p>
                            <select className={style.select} onChange={handleFilterOrder} defaultValue="def">
                                <option value="def">Pokedex</option>
                                <option value="asc">A-Z</option>
                                <option value="des">Z-A</option>
                                <option value="strongest">Strongest</option>
                                <option value="weakest">Weakest</option>
                            </select>                        
                        </div>

                        <div className={style.filterContainer}> 
                            <div className={style.originFilter}>  
                                <p className={style.filterTitle}>Origin</p>

                                <select className={style.select} disabled={disabledSelect} onChange={handleFilterCreated} defaultValue="all">
                                    <option value="all">All Pokemon</option>
                                    <option value="created">Created</option>
                                    <option value="official">Official</option>
                                </select>

                                {typeSelect.origin?.map((origin, index) => {
                                    return (
                                        <div>
                                            <div key={index}>
                                                <button className={style.popupButton} name={origin} key={origin} onClick={handleDeleteType}>{origin[0].toUpperCase() + origin.slice(1)}</button>
                                            </div>
                                        </div>
                                    )
                                })}                            
                            </div>

                            <p className={style.filterTitle}>OR</p>

                            <div className={style.filterTypes}>
                                <p className={style.filterTitle}>Type</p>

                                <select className={style.selectType} disabled={disabledSelect} onChange={handleFilterType} defaultValue="all">
                                    <option value="all">All Types</option>
                                    {types.map(type => {
                                        return <option name={type.name} value={type.name} key={type.name}>{type.name.toUpperCase()}</option>
                                    })}
                                </select>

                                {typeSelect.type?.map((type, index) => {
                                    return (
                                        <div>
                                            <div key={index}>
                                                <button className={style.popupButtonType} name={type} key={type} onClick={handleDeleteType}>{type.toUpperCase()}</button>
                                            </div>
                                        </div>
                                    )
                                })}                               
                            </div>
                        </div>
                    </div>   
                </div>

                <Pages />        
            </div>
        ); 
    }catch(error){
        return(
            <>
            <h2>Oops, algo ha salido mal...</h2>
            <button onClick={handleDeleteType}>Return to Home</button>
            </>
        );
    };
};

export default Home;