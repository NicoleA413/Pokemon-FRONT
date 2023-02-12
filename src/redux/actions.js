import axios from "axios";

export const SET_ERROR = "SET_ERROR";
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
export const GET_DETAIL_FROM_STATE = "GET_DETAIL_FROM_STATE"
export const GET_TYPES = "GET_TYPES";
export const POST_POKEMON = "POST_POKEMON";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const EDIT_POKEMON = "EDIT_POKEMON";
export const FILTER_CREATED = "FILTER_CREATED";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const apiList = await axios.get("/pokemons");
      const pokemons = apiList.data;

      dispatch({
        type: GET_POKEMONS,
        payload: pokemons,
      });

    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: "No se encontraron Pokemon",
      });
    };
  };
};

export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      const apiList = await axios.get(`/pokemons/?name=${name}`);
      const pokemon = apiList.data;
      return dispatch({
        type: GET_NAME_POKEMON,
        payload: [pokemon],
      });
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: "No se encontraron Pokemon con ese nombre",
      });
    };
  };
};

export const getDetail = (id) => {
  return async function(dispatch) {
    const apiList = await axios.get(`/pokemons/${id}`);
    const pokemon = apiList.data;

    dispatch({
      type: GET_DETAIL,
      payload: pokemon,
    });
  };
};

export function getDetailFromState(payload) {
  return {
    type: GET_DETAIL_FROM_STATE,
    payload,
  };
};

export function getTypes() {
  return async function (dispatch) {
    const apiList = await axios.get("/types");
    const types = apiList.data;
    return dispatch({
      type: GET_TYPES,
      payload: types,
    });
  };
};
  
export function postPokemon(dataPokemon) {
  return async function () {
    const api = await axios.post("/pokemons", dataPokemon);
    return api;
  };
};

export function setCurrentPage(payload) {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export function editPokemon(id, changes) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`/pokemons/${id}`, changes);

      return response;
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: "No se pudo editar el Pokemon",
      });
    };
  };
};

export const setPokemon = () => {
  return {
    type: GET_POKEMONS,
    payload: [],
  };
};

export const deletePokemon = (id) => {
  return async function () {
    const response = await axios.delete(`/pokemons/${id}`);
    return response;
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const filterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

export const filterByAttack = (payload) => {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
};

export const filterByType = (type) => {
  return async function (dispatch) {
    try {
      const apiList = await axios.get(`/types/${type}`);
      const pokemons = apiList.data;

      dispatch({
        type: FILTER_BY_TYPE,
        payload: pokemons,
      });
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: `No se encontraron Pokemon con el tipo ${type}`,
      });
    }
    
  };
};

export const setError = () => {
  return {
    type: SET_ERROR,
    payload: false,
  };
};