import React, { useState, useCallback, useEffect } from 'react'
import ItemCard from './ItemCard'
import 'animate.css'

function ListCard(props) {
    const [count, setCount] = useState(8)
    const [pokeList, setPokeList] = useState([])
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(true)
    const childList = props.pokesShow
    const reset = props.reset

    const showMore = () => {
        setCount(count + 8)
        props.countShowItem()
        if (count >= childList.length) {
            setStatus(true)
        }
    }

    useEffect(() => {
        if (reset) {
            setCount(8)
            setStatus(false)
        }
    }, [reset])
    const setTimeLoading = useCallback((value) => {
        setTimeout(() => {
            setLoading(value)
        }, 300)
    }, [])

    useEffect(() => {
        if(reset) {
            setLoading(true)
        }
        if (childList.length <= 8) {
            setPokeList(childList)
        }
        else {
            setPokeList(childList.slice(0, count))
        }
        setTimeLoading(false)
    }, [count, childList, setTimeLoading, reset]) 

    return (
        <div className="list">
            {loading ? <div className="container text-center m-2"><img width="100" height="100" src={require("../assets/ellipsis-1s-200px.gif")} alt="" /></div> : <><div className="row animate__animated animate__fadeIn">
                <ItemCard pokemonList={pokeList} />
            </div>
                {status && <p className='mb-5'>...The end...</p>}
                <button id='btnShowMore' className="button mt-3 mb-5 p-3" onClick={showMore} disabled={status} style={{ display: status && 'none' }}>Show more</button></>}
        </div>
    )
}

export default ListCard
