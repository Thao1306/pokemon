import axios from "axios";
import React, {  useEffect, useState } from "react";
import Button from "../components/Button";
import ListCard from "../components/ListCard";
import '../style/Home.css'

function Home() {
    const [urlList, setUrlList] = useState([])
    const [fullList, setFullList] = useState([]);
    const [noMatched, setNoMatched] = useState(false)
    const [pokesShow, setPokesShow] = useState([])
    const [reset, setReset] = useState(false)
    const [status, setStatus] = useState(true)


    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=500').then((res) => {
            setUrlList(res.data.results)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        let info = {}
        let arr = []

        if (urlList) {
            urlList.forEach((item) => {
                axios.get(item.url).then((res) => {
                    info = { ...item, ...res.data }
                    arr.push(info)
                    setFullList([...arr]);
                    setPokesShow([...arr]);
                    setStatus(false)
                }).catch((err) => console.log(err))
            })
        }
    }, [urlList]);

    const filterType = (type) => {
        
        const newFilterList = fullList.filter((poke) => {
            return poke.types[0].type.name === type
        })
        setPokesShow(newFilterList)
        setReset(true)

    }

    const searchPoke = (e) => {
        e.preventDefault()
        const searchList = fullList.filter((key) => {
            return key.name.includes(e.target[0].value)
        })
        setPokesShow(searchList)
        if (searchList.length === 0) {
            setNoMatched(true)
        } else {
            setNoMatched(false)
            setReset(true)
        }
    }
    const countShowItem = () => {
        setReset(false)
    }
    return (
        <>
            {status ? <div className="container text-center animate__animated animate__fadeOut" ><img width="600" height="600" src={require("../assets/1200x1200.gif")} alt="" /> </div> : <div className="text-center container animate__animated animate__fadeIn">
                <h1 className="m-3">Pokemon world</h1>

                <button className="button" onClick={() => { setPokesShow(fullList) }}>all</button>
                <Button pokeInfoList={fullList} filterType={filterType} />
                <form className="d-flex mb-5" onSubmit={searchPoke} >
                    <input type="text" className="form-control" placeholder="search Pokemon's name here" />
                    <button type="submit" className="button search ms-5">Submit</button>
                </form>
                {noMatched ? <p >Opp.. no pokemon with this name, please try again</p> :  <ListCard pokesShow={pokesShow} reset={reset} countShowItem={countShowItem} />}

               

                <div className="to-top" onClick={() => { window.scrollTo({ top: 0 }) }}>^</div>
                <div className="to-bottom" onClick={() => { window.scrollTo({ top: document.documentElement.scrollHeight }) }}>^</div>

            </div>}
        </>

    );
}

export default Home