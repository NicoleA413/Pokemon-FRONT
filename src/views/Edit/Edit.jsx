import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { editPokemon, getDetail, getPokemons, setPokemon, getTypes} from "../../redux/actions";
import style from "./Edit.module.css"
import Psyduck from "../../styles/images/Psyduck.png"
import Eevee from "../../styles/images/Eevee patita.png"

const Edit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const pokeDetail = useSelector((state) => state.detail);
    const types = useSelector((state) => state.types);


    const [form, setForm] = useState({
        name: pokeDetail[0].name ,
        hp: pokeDetail[0].hp ,
        attack: pokeDetail[0].attack ,
        defence: pokeDetail[0].defence ,
        speed: pokeDetail[0].speed ,
        height: pokeDetail[0].height ,
        weight: pokeDetail[0].weight ,
        image: pokeDetail[0].image ,
        types: pokeDetail[0].types ,
        created: true,
  });

    useEffect(() => {
        dispatch(getTypes());
        dispatch(setPokemon());
    }, [dispatch]);

  const [errors, setErrors] = useState({});

//-----------------------------------------VALIDATES------------------------------------------------

    let disabledButton =
    !(
        form.name.length &&
        form.hp &&
        form.attack &&
        form.defence &&
        form.speed &&
        form.types.length
    )

    const validate = (property, value) => {
        switch (property) {
            case "name":
                if(value.length >= 2 && value.length <= 20){
                    setErrors({...errors, name: ""})
                }    
                else{  	
                    setErrors({...errors, name: "El nombre debe contener entre 2 y 20 caracteres"});	
                   }  
                break;
            // case "image":
            //     /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/.test(form.image)
            //     ? setErrors({...errors, image: ""})
            //     : setErrors({...errors, image: "El URL de la imágen no es válido"});

            //     break;
            default:
                setErrors({...errors})
                break;
        }
        if(value === ""){
            setErrors({...errors, [property]: "campo necesario"})
        }else{
            setErrors({...errors, [property]: ""})
        }
    }

//------------------------------------------HANDLERS--------------------------------------------------

const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]:value });
    validate(property, value);
}

const handleSelect = (event) => {
    if (!form.types.includes(event.target.value)) {
      setForm({
        ...form,
        types: [...form.types, event.target.value],
      });
    }
  };
  
const handleDeleteType = (event) => {
    setForm({
      ...form,
      types: form.types.filter((t) => t !== event),
    });
};

const submitHandler = (event) =>{
    event.preventDefault();
    dispatch(editPokemon(id, form));
        console.log(typeof form.image);
        alert("Pokemon editado con éxito");
        setForm({
            "name": "",
            "hp": "",
            "attack": "",
            "defense": "",
            "speed": "",
            "height": "",
            "weight": "",
            "image": "",
            "types": [],
        });
        history.push(`/pokemons/${id}`)
        dispatch(getPokemons())
        dispatch(getDetail(id))


}

//--------------------------------------------FORM----------------------------------------------------
    return (
        <div className={style.mainContainer}>
            <div className={style.title}>
                <h2>EDIT POKEMON</h2>
            </div>

               <NavLink to={`/pokemons/${id}`}><button className={style.buttonReturn}>Return to Pokemon</button></NavLink> 
            
            <div>
                <div className={style.imageModule}>
                    <div className={style.imageContainer}>
                        <img className={style.image} src={pokeDetail[0].image} alt="imagen-del-pokemon"/>                  
                    </div>

                    <div className={style.section}>
                        <label for="image" className={style.label}>Update image:</label>
                        <input type="url" className={style.input} id="image" placeholder="http://url.com/image.png" name="image" value={form.image} onChange={changeHandler} />
                    </div>                
                </div>


                <form className={style.form} onSubmit={submitHandler}>

                    <div className={style.section}>
                        <label for="name" className={style.label}>Name:</label>
                        <input type="text" className={style.input} id="name" placeholder="pikachu" name="name" value={form.name} onChange={(event) => changeHandler(event)} autoComplete="off"/>
                    </div>

                    <div className={style.section}>
                        <label for="hp" className={style.label}>HP:</label>
                        <input type="number" className={style.input} id="hp" placeholder="50" min="20" max="150" name="hp" value={form.hp} onChange={(event) => changeHandler(event)} />
                    </div>

                    <div className={style.section}>
                        <label for="attack" className={style.label}>Attack:</label>
                        <input type="number" className={style.input} id="attack" placeholder="50" min="10" max="150" name="attack" value={form.attack} onChange={changeHandler} />
                    </div>

                    <div className={style.section}>
                        <label for="defence" className={style.label}>Defence:</label>
                        <input type="number" className={style.input} id="defence" placeholder="50" min="10" max="150" name="defence" value={form.defence} onChange={changeHandler} />
                    </div>

                    <div className={style.section}>
                        <label for="speed" className={style.label}>Speed:</label>
                        <input type="number" className={style.input} id="speed" placeholder="40" min="10" max="150" name="speed" value={form.speed} onChange={changeHandler} />
                    </div>

                    <div className={style.section}>
                        <label for="height" className={style.label}>Height:</label>
                        <input type="number" className={style.input} id="height" placeholder="10" min="1" max="50" name="height" value={form.height} onChange={changeHandler} />
                    </div>
            
                    <div className={style.section}>
                        <label for="weight" className={style.label}>Weight:</label>
                        <input type="number" className={style.input} id="weight" placeholder="100" min="10" max="1000" name="weight" value={form.weight} onChange={changeHandler} />
                    </div>

                    <div className={style.section} id="typesSection">
                        <select className={style.select} onChange={handleSelect} disabled={form.types.length >= 2} defaultValue="title">
                            <option value="title" disabled name="types">Types</option>

                            {types.map((t) => {
                                return (
                                    <option name={t.name} value={t.name} key={t.name}>{t.name.toUpperCase()}</option>
                                );
                            })}
                
                        </select>

                        <ul className={style.buttonList}>
                            {form.types.map((t) => {
                                return (
                                    <li key={t}>    
                                        <button className={style.popUpButtons} name={t} onClick={() => handleDeleteType(t)}>{t.toUpperCase()}</button>
                                    </li>
                                );
                            })}
                        </ul>

                    </div>

                    < input type="submit" className={style.button} disabled={disabledButton} value="UPDATE"/>

                </form>

                <img src={Psyduck} className={style.Psyduck} alt="Psyduck" />
                <img src={Eevee} className={style.Eevee} alt="Eevee" /> 
                
                <div >
                    <ul className={style.spans}>
                        <li className={style.span}>{errors.name && <span>{errors.name}</span>}</li>
                        <li className={style.span}>{errors.hp && <span>{errors.hp}</span>}</li>
                        <li className={style.span}>{errors.attack && <span>{errors.attack}</span>}</li>
                        <li className={style.span}>{errors.defence && <span>{errors.defence}</span>}</li>
                        <li className={style.span}>{errors.speed && <span>{errors.speed}</span>}</li>
                        <li className={style.span}>{errors.height && <span>{errors.height}</span>}</li>
                        <li className={style.span}>{errors.weight && <span>{errors.weight}</span>}</li>
                        <li className={style.span} id="typeSpan">{errors.types && <span>{errors.types}</span>}</li>
                        {/* <li className={style.span} id="imageSpan">{errors.image && <span>{errors.image}</span>}</li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Edit;