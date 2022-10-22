import React, {useState, useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            
            
            <Container fluid="md">
               <br />
                <Row>
                    <Col sm={true}>
                        <Button onClick={()=>subtract()}>-</Button>&nbsp;
                        <Button onClick={()=>add()}>+</Button>
                    </Col>
                    <Col sm={true}>
                        <h5>&nbsp;Your Budget: <span className="span1">{cantidad}</span></h5>
                    </Col>
                    </Row>

                <br />
                <Row>
                    <Col sm={true}>
                        <Button onClick={()=>metaRestar()}>-</Button>&nbsp;
                        <Button onClick={()=>metaSumar()}>+</Button>
                    </Col>
                    <Col sm={true}>
                        <h5>&nbsp;Your Financial Goal: <span className="span1">{meta} </span></h5>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col sm={true}>
                        <Button onClick={()=>subtractTarget()}>-</Button>&nbsp;
                        <Button onClick={()=>addTarget()}>+</Button>
                    </Col>
                    <Col>
                        <h5>&nbsp;Once Coin Value Is: <span className="span1">{coinTarget}</span></h5>
                    </Col>
                </Row>
                <Row>
                    <Col sm={true}>
                    <br />
                    <h3>{titulo}</h3>
                    {result}  
                    </Col>  
                </Row>
            </Container>
        )
    }
}

export default Coins; 