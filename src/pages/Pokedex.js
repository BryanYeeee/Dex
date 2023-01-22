import React, { Component } from "react";

function Pokedex(props) {
    // this.dexBackground = React.createRef();
    let [isFetched, setFetched] = React.useState({
        error: null,
        loaded: false,
    })
    let [pokemon, setPokemon] = React.useState([])
    let [contentWidth, setWidth] = React.useState(0)
    let [dimensions, setDimensions] = React.useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    let getContentWidth = React.useCallback((dexBg) => {
        if (dexBg) setWidth(dexBg.clientWidth - dexBg.clientHeight * 0.6 / Math.tan(65 * 0.0174533))
    }, [dimensions])

    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, false);
        fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setFetched({
                        error: null,
                        loaded: true
                    })
                    setPokemon(result.results)
                },
                (error) => {
                    setFetched({
                        error,
                        loaded: true
                    })
                }
            )
    }, [])

    if (isFetched.error) {
        return <div>Error: {isFetched.error.message}</div>;
    } else if (!isFetched.loaded) {
        return <div>Loading...</div>;
    }
    console.log(pokemon)
    return (
        <div className="h-full w-full">
            <div className='dex' ref={getContentWidth}>
                <div className='absolute left-0 bottom-0 bg-dex-2 h-full w-28' />
                <div className="w-full h-full bg-dex-1" />
            </div>
            <div className="dexContent" style={{
                width: contentWidth
            }}>
                <ul className="overflow-auto h-full">
                    {pokemon.map((item, index) => (
                        <li key={index} className="dexEntry">
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}

export default Pokedex;