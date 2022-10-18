import React, {useState, useEffect} from 'react';

import { getAll } from "../Services/coinsServices";
import styled from 'styled-components';

function Coins(){
    const titulo = "List of Coins";
    const [coins, setCoins] = useState([]);
    const cachedCantidad = window.sessionStorage.getItem("cantidad") ? parseInt(window.sessionStorage.getItem("cantidad")) : 0;
    const [cantidad, setCantidad] = useState(cachedCantidad);
    const [coinTarget, setCoinTarget] = useState(0);
    const [meta, setMeta] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
 
    useEffect(() => {
        
        const result = async ()=>{
            try {
                const responseData = await getAll()
                console.log(responseData.data)
                const result = responseData.data.rates;
                console.log(result)
                setCoins(result)
                setIsLoading(false)
            } catch(e){
                console.log(e);
            }
        }

        result()
    }, []
    )


    //const values = Object.values(coins).map ((coin) => <p>{coin}</p>)
    const add = () => {
        const result = cantidad+100;
        setCantidad(result)
        window.sessionStorage.setItem("cantidad",result)
    };

    const subtract = () => {
        const result = cantidad-100;
        setCantidad(result)
        window.sessionStorage.setItem("cantidad",result)
    };

    const addTarget = () => {
        const result = coinTarget + 1;
        setCoinTarget(result)
        window.sessionStorage.setItem("coinTarget",result)
    };

    const subtractTarget = () => {
        const result = coinTarget - 1;
        setCoinTarget(result)
        window.sessionStorage.setItem("coinTarget",result)
    };

    const metaSumar = () => {
        const result = meta + 5000;
        setMeta(result)
        window.sessionStorage.setItem("metat",result)
    };

    const metaRestar = () => {
        const result = meta - 5000;
        setMeta(result)
        window.sessionStorage.setItem("meta",result)
    };


    const GoalText = styled.p`
    color: ${(props) => props.textColor};
    `

    const result = Object.keys(coins).map((coin)=> {
        const monedasTotal =  (parseInt(cantidad) / coins[coin]).toFixed();

        const color = monedasTotal > meta ? "green" : "red";

        return <GoalText textColor={color}>{coin} : ${coins[coin]} : You can buy {monedasTotal}&nbsp;
                coins and get ${coinTarget*monedasTotal} if the value reaches ${coinTarget} </GoalText> 
        })
        
    if(isLoading){
        return(
            <div>
                Cargando....
            </div>
        )} else {

        return(
            <div>
            <h2>Your Budget:</h2>
            <button onClick={()=>add()}>+</button>
            <button onClick={()=>subtract()}>-</button><br />
            <span>{cantidad}</span>

            <h2>Your Financial Goal:</h2>
            <button onClick={()=>metaSumar()}>+</button>
            <button onClick={()=>metaRestar()}>-</button><br />
            <span>{meta}</span>

            <h2>Once Coin Value Is:</h2>
            <button onClick={()=>addTarget()}>+</button>
            <button onClick={()=>subtractTarget()}>-</button><br/>
            <span>{coinTarget}</span>

            <h2>{titulo}</h2>
            
            {result}  
            </div>
        )
    }
}

export default Coins; 