import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ItemCard(props) {
    const [pokeList, setPokeList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setPokeList(props.pokemonList)
    }, [props.pokemonList])
    const handleClick = (id) => {
        navigate(`detail/${id}`)
    }
    return (
        <>
            {pokeList.map((item, index) => {
                const { name, abilities, id } = item;
                const image = item.sprites.other.dream_world.front_default;
                const type = item.types[0].type.name;
                return (

                    <div key={index} className="col-3">
                        <div className={`card-item ${type}`} >
                            <div className="card-img">
                                <img src={image} alt={name} />
                            </div>
                            <div className="card-content">
                                <dl>
                                    <dt>Name</dt>
                                    <dd>{name}</dd>
                                </dl>
                                <dl>
                                    <dt>Type</dt>
                                    <dd>{type}</dd>
                                </dl>
                                <dl className="dl-last">
                                    <dt>Abilities</dt>
                                    <dd >{abilities.map((abi) => {
                                        return <span>{abi.ability.name} </span>
                                    })}</dd>
                                </dl>
                                <button className="button button-detail" onClick={() => handleClick(id)}>Detail</button>
                            </div>
                        </div>

                    </div>
                )
            })
            }
        </>
    )
}

export default ItemCard