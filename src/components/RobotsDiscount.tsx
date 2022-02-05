import React, { useContext } from "react";
import styles from './Robots.module.css'
import { appContext, appSetStateContext } from "../AppState";
import { useAddToCart } from "./AddToCart";

interface RobotProps {
  id: number;
  name: string;
  email: string;
}

const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
  const value = useContext(appContext);
  const addToCart = useAddToCart()
  return (
    <div className={styles.cardContainer}> 
      <img alt="robot" src={`https://robohash.org/${id}`} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者:{value.userName}</p>
      <button onClick={() => addToCart(id, name)}>打折中 加入购物车</button>
    </div>
  );
};

export default RobotDiscount;
