import React, {useState, useEffect} from 'react';

import { getAll } from "../Services/coinsServices";
import styled from 'styled-components';
import './Coins.css'
import { Button } from 'react-bootstrap'

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
                coins and reach ${coinTarget*monedasTotal} if the coin value becomes ${coinTarget} </GoalText> 
        })
        
    if(isLoading){
        return(
            <div>
                Cargando....
            </div>
        )} else {

        return(
            <div>
            <h5>
            <Button onClick={()=>subtract()}>-</Button>&nbsp;
            <Button onClick={()=>add()}>+</Button>
            &nbsp;Your Budget: <span className="span1">{cantidad}</span>
            </h5>
      
            <h5>
            <Button onClick={()=>metaRestar()}>-</Button>&nbsp;
            <Button onClick={()=>metaSumar()}>+</Button>
            &nbsp;Your Financial Goal: <span className="span1">{meta} </span>
            </h5>
            <h5> 
            <Button onClick={()=>subtractTarget()}>-</Button>&nbsp;
            <Button onClick={()=>addTarget()}>+</Button>
            &nbsp;Once Coin Value Is: <span className="span1">{coinTarget}</span>
            </h5>
            <br />
            <h3>{titulo}</h3>
            
            {result}  
            </div>
        )
    }
}

export default Coins; 