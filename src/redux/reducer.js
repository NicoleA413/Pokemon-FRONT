import {
    SET_ERROR, 
    GET_POKEMONS,
    GET_DETAIL,
    GET_DETAIL_FROM_STATE,
    GET_TYPES,
    POST_POKEMON,
    GET_NAME_POKEMON,
    SET_CURRENT_PAGE,
    EDIT_POKEMON,
    FILTER_CREATED,
    FILTER_BY_NAME,
    FILTER_BY_ATTACK,
    FILTER_BY_TYPE,
 } from './actions';

 const initialState = {
    pokemons: [],
    allPokemons: [],
    currentPage: 1,
    types: [],
    detail: [],
    error: "",
  };

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case GET_POKEMONS:
            if (!action.payload.includes(null)) {    
                return {
                     ...state, 
                     pokemons: action.payload,
                     allPokemons: action.payload,
                     currentPage: 1,
                };
            } else {
                return { 
                    ...state,
                     error: action.payload 
                };
            };

        case GET_DETAIL:
            return {
                ...state,
                details: action.payload,
            };

        case GET_DETAIL_FROM_STATE:
            const pokemons = [...state.allPokemons];
            const pokemonDetail = pokemons.filter(
              (poke) => poke.id.toString() === action.payload
            );
            return {
              ...state,
              detail: pokemonDetail,
            };

        case GET_TYPES:
            return {
              ...state,
              types: action.payload,
            };
          
        case GET_NAME_POKEMON:
            return {
              ...state,
              pokemons: action.payload,
              currentPage: 1,
            };
          
        case POST_POKEMON:
            return {
              ...state,
            };

        case SET_CURRENT_PAGE:
            return {
              ...state,
              currentPage: action.payload,
            };

        case EDIT_POKEMON:
            return {
             ...state,
            };
        
        case FILTER_CREATED:
            const pokemonsCreated = [...state.pokemons];

            const createdFilter = action.payload === "created" 
            ? pokemonsCreated.filter(pokemon => pokemon.created) 
            : pokemonsCreated.filter(pokemon => !pokemon.created);

            return {
                ...state,
                pokemons: action.payload === "all" 
                ? pokemonsCreated 
                : createdFilter,
                error: createdFilter.length > 0 
                ? false 
                : "No hay Pokemon creados"
            };

        case FILTER_BY_NAME:
            const pokemonsName = [...state.pokemons];

            const nameFilter = action.payload === "asc" 
            ? pokemonsName.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) 
            : pokemonsName.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            });

            return {
                ...state,
                pokemons: nameFilter,
            };

        case FILTER_BY_ATTACK:
            const pokemonsAttack = [...state.pokemons];

            const attackFilter = action.payload === "strongest" 
            ? pokemonsAttack.sort((a, b) => {
                if (a.attack > b.attack) {
                    return -1;
                }
                if (b.attack > a.attack) {
                    return 1;
                }
                return 0;
            }) 
            : pokemonsAttack.sort((a, b) => {
                if (a.attack > b.attack) {
                    return 1;
                }
                if (b.attack > a.attack) {
                    return -1;
                }
                return 0;
            });

            return {
                ...state,
                pokemons: attackFilter,
            };

        case FILTER_BY_TYPE:
            if (!action.payload.includes(null)) {    
                return {
                    ...state, 
                    pokemons: action.payload,
                    currentPage: 1,
                };
            } else {
                return { 
                    ...state,
                    error: action.payload 
                };
            };

        default:
            return { ...state };
    };
};

export default rootReducer;