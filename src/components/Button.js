import React, { useEffect, useState } from 'react'

function Button(props) {
    const [typeList, setTypeList] = useState([]);
    const [loading, setLoading] = useState(true)
    const pokeList = props.pokeInfoList
    const getBtnType = (type) => {
        props.filterType(type)
    }
    useEffect(() => {
        const types = pokeList.map((item) => {
            return item.types[0].type.name
        })
        const newTypes = [...new Set(types)]
        setTypeList(newTypes)
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [pokeList])

    return (
        <>
            {loading ? <div className="container text-center m-2"><img width="100" height="100" src={require("../assets/ellipsis-1s-200px.gif")} alt="" /></div> : <div className="tag m-5 animate__animated animate__fadeIn">
                {typeList.map((item, index) => {
                    return (
                        <button className={`button ${item} m-2`} onClick={() => getBtnType(item)} key={index}>{item}</button>
                    )
                })}
            </div>}
        </>
    )
}

export default Button
