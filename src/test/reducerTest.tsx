import React,{useReducer, createContext, useContext} from 'react'
import ActionButton from 'antd/lib/modal/ActionButton'

const initState = 0
type Action = {
	type:string,
	count:number
}

const INC = 'increment'
const DEC = 'decrement'
const SET = 'set'
const reducer = (state:number,action:Action):any => {
	switch(action.type){
		case INC:
			return state + action.count
		case DEC:
			return state - action.count
		case SET:
			return action.count
	}
}


export default function Test(props:any) {
	const [count, setCount] = useReducer(reducer, initState)
	return (
		<>
			<CountProvider>
				<Counter></Counter>
				<Counter></Counter>
			</CountProvider>
		</>
	)
}

const CountContext = createContext({count: 0, dispatch:(action:Action) => {}})
const CountProvider = (props:any) => {
	const [count, dispatch] = useReducer(reducer, initState)
	return (
		<CountContext.Provider value={{count, dispatch}}>
			{props.children}
		</CountContext.Provider>
	)
}

const useCount = () => {
	const contextValue = useContext(CountContext)
	return contextValue
}

const Counter = () => {
	const { count, dispatch } = useCount()
	return (
		<div>
			<p>count: {count}</p>
			<button onClick={() => {dispatch({type: INC, count: 1})}}>+1</button>
			<button onClick={() => {dispatch({type: DEC, count: 1})}}>-1</button>
			<button onClick={() => {dispatch({type: INC, count: 5})}}>+5</button>
			<button onClick={() => {dispatch({type: DEC, count: 5})}}>-5</button>
			<button onClick={() => {dispatch({type: SET, count: 10})}}>设置10</button>
		</div>
	)
}
