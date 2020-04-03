import React, {useState, createContext, useContext, useReducer} from 'react'


interface ColorContextI {
	color:string,
	dispatch: ({}:Action) => {}
}

type Action = {
	type: string,
	color: string
}
const ColorContext = createContext({color: '', dispatch: ({}:Action) => {}})

const UPDATE_COLOR = 'UPDATE_COLOR'
const reducer = (state:any,action:Action) => {
	switch(action.type){
		case UPDATE_COLOR:
			return action.color
			break;
		default:
			return state 
			break
	}
}

const Color = (props:any) => {
	const [color, dispatch] = useReducer(reducer, 'blue')
	return (
		<ColorContext.Provider value={{color, dispatch}}>
			{props.children}
		</ColorContext.Provider>
	)
}



const ShowColor = (props:any) => {
	const { color } = useContext(ColorContext)
	return  (
		<div style={{color: color}}>字体颜色展示为{color}</div>
	)
}

const Btns = (props:any) => {
	const {dispatch} = useContext(ColorContext)
	return  (
		<div>
			<button onClick={() => {dispatch({type: UPDATE_COLOR, color: 'red'})}}>red</button>
			<button onClick={() => {dispatch({type: UPDATE_COLOR, color: 'blue'})}}>blue</button>
		</div>
	)
}


export default function Test(props:any) {

	return (
		<Color>
			<ShowColor />
			<Btns />
		</Color>
	)
}