import React, { useContext } from "react";
import { appContext, appSetStateContext } from "../AppState";
import styles from './Robots.module.css'
import {withAddToCart} from './AddToCart'

// 定义接口，确定类型

export interface RobotsProps{
    id: number,
    name: string,
    email: string,
    addToCart: (id,name)=>void
}

// {id, name, email} 是 props对象的 ES6 展开
// Robots: React.FC<RobotsProps>  React.FC Robots 的类型？ <RobotsProps> Robots 接受的参数类型
const Robots: React.FC<RobotsProps> = ({id, name, email, addToCart})=>{
    const value = useContext(appContext);
    return <div className={styles.cardContainer}>
                <img alt="robot" src={`https://robohash.org/${id}`}/>
                <h2>{name}</h2>
                <p>{email}</p>
                <p>作者: {value.userName}</p>
                <button onClick={()=> addToCart(id,name)}>加入购物车</button>
            </div>
   
}

export default withAddToCart(Robots)