import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPokemons, getTypes } from "../../redux/actions";
import style from "./Form.module.css";
import Eevee from "../../styles/images/Eevee flores.png";
import Bulbasaur from "../../styles/images/Bulbasaur.png";

const Form = () => {
    const dispatch = useDispatch()

    const types = useSelector((state) => state.types);
    
    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);
   
    const history = useHistory();

    const [form, setForm] = useState({
        name: "",
        hp: "",
        attack: "",
        defence: "",
        speed: "",
        height: "",
        weight: "",
        types: [],
        image: "",
        created: true
    });

    let [errors, setErrors] = useState({})

// -----------------------------------------VALIDATES------------------------------------------------------------

    const disabledButton = form.name.length < 2 || !form.types.length
    
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
            setErrors({...errors, [property]: ""})
        }
    }

    const finalValidate = (form) => {
        let errors = {}
        if(!form.name || form.name.length < 2){
            errors.name = "Falta ingresar un nombre válido"
        }
        if(!form.hp){
            errors.hp = "Debe tener un HP con valor entre 20 y 150"
        }
        if(!form.attack){
            errors.attack = "Debe tener un ataque con valor entre 10 y 150"
        }
        if(!form.defence){
            errors.defence = "Debe tener una defensa con valor entre 10 y 150"
        }
        if(!form.speed){
            errors.speed = "Debe tener una velocidad con valor entre 10 y 150"
        }
        if(!form.height){
            errors.height = "Debe tener una altura con valor entre 1 y 50"
        }
        if(!form.weight){
            errors.weight = "Debe tener un peso con valor entre 20 y 150"
        }
        if(!form.types.length){
            errors.types = "Debe seleccionar al menos un tipo"
        }

        return errors
    }

// -------------------------------------------HANDLERS-------------------------------------------------------

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

    const handleDeleteType = (ev) => {
        setForm({
          ...form,
          types: form.types.filter((t) => t !== ev),
        });
    };

    const submitHandler = (event) =>{
        event.preventDefault();
        axios.post("http://localhost:3001/pokemons", form)
        .then(res=> {
            alert("Pokemon creado con éxito");
            history.push("/pokemons");
            dispatch(getPokemons());
        })
        .catch(err=> {
            setErrors( finalValidate(form));
            alert("Faltan campos obligatorios o el nombre ya está en uso");
            
        })
    }

//----------------------------------------FORM----------------------------------------------------------

    return (
        <div className={style.mainContainer}>
            <div className={style.title}><h2>Create Pokemon</h2></div>

            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.section}>
                    <label className={style.label} htmlFor="name">Name:</label>
                    <input className={style.input} type="text" id="name" placeholder="pikachu" name="name" value={form.name} onChange={changeHandler}/>    
                </div>

                <div className={style.section}>
                    <label className={style.label} htmlFor="hp">HP:</label>
                    <input className={style.input} type="number" id="hp" placeholder="20 - 150" min="20" max="150" name="hp" value={form.hp} onChange={changeHandler} />   
                </div>

                <div className={style.section}>
                    <label className={style.label} htmlFor="attack">Attack:</label>
                    <input className={style.input} type="number" id="attack" placeholder="10 - 150" min="10" max="150" name="attack" value={form.attack} onChange={changeHandler} />    
                </div>

                <div className={style.section}>
                    <label className={style.label} htmlFor="defence">Defence:</label>
                    <input className={style.input} type="number" id="defence" placeholder="10 - 150" min="10" max="150" name="defence" value={form.defence} onChange={changeHandler} />    
                </div>

                <div className={style.section}>
                    <label className={style.label} htmlFor="speed">Speed:</label>
                    <input className={style.input} type="number" id="speed" placeholder="10 - 150" min="10" max="150" name="speed" value={form.speed} onChange={changeHandler} />    
                </div>

                <div className={style.section}>
                    <label className={style.label} htmlFor="height">Height:</label>
                    <input className={style.input} type="number" id="height" placeholder="1 - 50" min="1" max="50" name="height" value={form.height} onChange={changeHandler} />   
                </div>
            
                <div className={style.section}>
                    <label className={style.label} htmlFor="weight">Weight:</label>
                    <input className={style.input} type="number" id="weight" placeholder="10 - 1000" min="10" max="1000" name="weight" value={form.weight} onChange={changeHandler} />                   
                </div>

                <div className={style.section}>
                    <select className={style.select} onChange={(e) => handleSelect(e)} disabled={form.types.length >= 2} defaultValue="title">
                        <option value="title" disabled name="types">Types</option>

                        {types.map((t) => {
                            return (
                                <option value={t.name} name={t.name} key={t.name}>{t.name.toUpperCase()}</option>
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

                <div className={style.section}>
                    <label className={style.label} htmlFor="image">Image(Optional):</label>
                    <input className={style.input} type="url" id="image" placeholder="http://url.com/image.png" name="image" value={form.image} onChange={changeHandler} />
                </div>

                <input className={style.button} type="submit" disabled={disabledButton} value="CREATE"/>
            </form>

            <img className={style.Eevee} src={Eevee} alt="Eevee flores"/>
            <img className={style.Bulbasaur} src={Bulbasaur} alt="Bulbasaur"/>

            <div >
                <ul className={style.spans}>
                <li className={style.span}>{errors.name && <span>{errors.name}</span>}</li>
                <li className={style.span}>{errors.hp && <span>{errors.hp}</span>}</li>
                <li className={style.span}>{errors.attack && <span>{errors.attack}</span>}</li>
                <li className={style.span}>{errors.defence && <span>{errors.defence}</span>}</li>
                <li className={style.span}>{errors.speed && <span>{errors.speed}</span>}</li>
                <li className={style.span}>{errors.height && <span>{errors.height}</span>}</li>
                <li className={style.span}>{errors.weight && <span>{errors.weight}</span>}</li>
                <li className={style.span} id="typesSpan">{errors.types && <span>{errors.types}</span>}</li>
                <li className={style.span} id="imageSpan">{errors.image && <span>{errors.image}</span>}</li>
                </ul>
            </div>
        </div>    
    );
};

export default Form;