import React, { useState } from "react";

interface AppStateValue {
    userName: string,
    shoppingCart: { items: {id: number; name: string}[]};
}
// const defaultContextValue: AppStateValue 表示 defaultContextValue 是 AppStateValue 里定义的那样
const defaultContextValue: AppStateValue = {
    userName: "Dmoon",
    shoppingCart: {items: []}
}

export const appContext = React.createContext(defaultContextValue)

// 购物车 因为要传入函数，所以初始值为 undefined
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined)
const AppStateProvider: React.FC = (props)=>{
    const [state, setState] = useState(defaultContextValue)
    return <appContext.Provider value={state}>
        <appSetStateContext.Provider value={setState}>
            {props.children}
        </appSetStateContext.Provider>  
    </appContext.Provider>
}
export default AppStateProvider