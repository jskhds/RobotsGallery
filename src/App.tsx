import React, {useState, useEffect}from 'react';
import robots from './mockdata/robots.json'
import Robots from './components/Robots'
import styles from './App.module.css'
import logo from './assets/images/logo.svg'
import ShoppingCart from './components/ShoppingCart';
import RobotsDiscount from './components/RobotsDiscount';

interface Props {}

interface State {
  robotsGallery: any[]
}
const App: React.FC = (props) =>{
    const [robotsGallery, setRobotsGallery] = useState<any>([]); 
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError]  = useState<string>()
    useEffect(()=>{
      const fetchData = async()=>{
        // 获得数据以前 loading 为 true
        setLoading(true)
        try {
          const responses = await fetch("https://jsonplaceholder.typicode.com/users")
          const data = await responses.json()
          setRobotsGallery(data)
        }catch(e){
          setError(e.message)
        }
        // 获取数据以后 loading 为 false
        setLoading(false);
      }
      fetchData();
    },[])


  return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt = 'logo'/>
          <h1>机器人online购物平台</h1>
        </div>
        <ShoppingCart />
        {(!error || error === "" )&& <div>{error}</div> }
        {
          !loading?  
          <div className={styles.robotList}>
          {robotsGallery.map((r,index) => (
            index%2 === 0?
            <RobotsDiscount id={r.id} email={r.email} name={r.name} key={r.id}/>
            :<Robots id={r.id} email={r.email} name={r.name} key={r.id} />
          ))}</div>
          : <h2>loading 加载中</h2>}
        
        
      </div>
      )
  
  
    
  
}

export default App;
