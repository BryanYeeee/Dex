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
        if (dexBg) setWidth(dexBg.clientWidth - dexBg.clientHeight * 0.8 / Math.tan(65 * 0.0174533))
    }, [dimensions])


    React.useEffect(() => {
        window.addEventListener("resize", () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, false);
        fetchData();
    }, [])
    let fetchData = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0")
            .then(res => res.json())
            .then(
                (result) => {
                    result = result.results
                    let individualPoke = []
                    for (let i = 0; i < result.length; i++) {
                        individualPoke.push(fetch(result[i].url)
                            .then(res => res.json())
                            .then(res => {
                                result[i].pokemon = res
                            }))
                    }
                    Promise.all(individualPoke).then(() => {
                        setPokemon(result)
                        setFetched({
                            loaded: true
                        })
                    })
                },
                (error) => {
                    setFetched({
                        error,
                        loaded: true
                    })
                }
            )

    }

    if (isFetched.error) {
        return <div>Error: {isFetched.error.message}</div>;
    } else if (!isFetched.loaded) {
        return <div>Loading...</div>;
    }
    console.log(pokemon[0])
    return (
        <div className="h-full w-full overflow-hidden">
            <div className='dex' ref={getContentWidth}>
                <div className='absolute left-0 bottom-0 bg-dex-2 h-full w-28' />
                <div className="w-full h-full bg-dex-1" />
            </div>
            <div className="dexContent" style={{
                width: contentWidth
            }}>
                <div className="dexEntries">
                    {pokemon.map((item, index) => (
                        <div key={index} className="dexEntry md:text-2xl text-base">
                            <div/>
                            <div><img className="dexSprite" src={item.pokemon.sprites.front_default} /></div>
                            <div className="text-sm text-subfont">No. {item.pokemon.id}</div>
                            <div>{item.name.toUpperCase()}</div>
                            <div/>

                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Pokedex;