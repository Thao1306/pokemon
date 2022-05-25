import "../style/Detail.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

function Detail() {
    // const [charView, setChatView] = useState([]);
    const [poke, setPoke] = useState({})
    const [dataLabels, setDataLabels] = useState([])
    const [datasetsData, setDatasetsData] = useState([])
    const bgColor = ["#F2CC59", "#BA68C8", "#407BFF", "#E6E5E6", "#c27862", "#6ad2af"]
    const summaryRef = useRef();
    const navigate = useNavigate()
    useEffect(() => {
        const id = window.location.pathname.slice(8)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
            setPoke(res.data)
        }).catch((err) => {
            console.log(err);
            navigate('*')
        })
    });
    const { name, sprites, weight, height, types, stats, abilities, base_experience } = poke
    useEffect(() => {
        if (stats) {
            setDataLabels(stats.map((item) => item.stat.name))
            setDatasetsData(stats.map((item) => item.base_stat))
        }
        //     setChatView(summaryRef.current.legend.legendItems);
        //     console.log(summaryRef.current.legend.legendItems);
    }, [stats, summaryRef])
    const data = {
        labels: dataLabels,
        datasets: [
            {
                label: "stats of Pokemon",
                data: datasetsData,
                backgroundColor: bgColor,
                borderColor: bgColor,
                borderWidth: 1,
            },
        ],
    };
    const pieOptions = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },

        },

    };
    return (
        <div className="text-center detail ">
            {(Object.keys(poke).length === 0 && poke.constructor === Object) ? <div className="container " ><img width="600" height="600" src={require("../assets/1200x1200.gif")} alt="" /> </div> : <div className={`pt-5 ${types[0].type.name}`}>
                <h2 className="text-uppercase">{name}</h2>
                <div className="d-flex container detail-main">
                    <div className="col-4 detail-img">
                        <img src={sprites.other.dream_world.front_default} alt={name} />
                    </div>
                    <div className="card-content col-8">
                        <dl>
                            <dt>type</dt>
                            <dd>
                                {types.map((item) => {
                                    return <span className="me-2">{item.type.name} </span>
                                })}
                            </dd>
                        </dl>
                        <dl>
                            <dt>height</dt>
                            <dd>{height * 1 / 10} cm</dd>
                        </dl>
                        <dl>
                            <dt>weight</dt>
                            <dd>{weight * 1 / 10} kg</dd>
                        </dl>
                        <dl>
                            <dt>base experience</dt>
                            <dd>{base_experience}</dd>
                        </dl>
                        <dl>
                            <dt>abilities</dt>
                            <dd>
                                {abilities.map((item) => {
                                    return <span className="me-2">{item.ability.name} </span>
                                })}
                            </dd>
                        </dl>
                        <dl >
                            <dt>Stats</dt>
                            <dd >
                                <div>
                                    <Pie
                                        data={data} options={pieOptions} ref={summaryRef}
                                    />
                                    {/* {charView?.map((data, i) => (
                                        <div className="d-flex align-items-center mt-2" key={i}>
                                            <span
                                                style={{
                                                    height: 16,
                                                    width: 16,
                                                    display: "inline-block",
                                                    background: `${data?.fillStyle}`,
                                                    borderRadius: 5,
                                                    mr: 0.5,
                                                }}
                                            ></span>
                                            <span className="ms-3"> {data?.text}</span>
                                        </div>
                                    ))} */}
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
                <Link to="/">
                    <button className="button mt-5 mb-3 p-3">Back to home</button>
                </Link>
            </div>}

        </div>
    );
}

export default Detail