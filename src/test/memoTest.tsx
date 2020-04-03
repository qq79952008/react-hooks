import React, {useState, useMemo, useCallback} from 'react'


const Child = (props:any) => {
	console.log(`${props.name}渲染`)
	return (

	<div>
		<button onClick={props.onClick}>改标题</button>
		<p>{props.name}</p>
	</div>
	)
}

const areEqual = (prevProps:any, nextProps:any) => {
	if(prevProps.item.name === nextProps.item.name){
		return true
	}
	return false
}

const ChildMemo = React.memo(Child)

export default function Test(props:any) {
	const [title, setTitle] = useState('标题')
	const [count, setCount] = useState(0)
	const [subTitle, setSubTitle] = useState('副标题')
	const onChangeTitle = useCallback((title:string) => {
		setTitle('修改了标题')
	}, [])

	// 一个非常耗时的一个计算函数
  // result 最后返回的值是 49995000
  const expensiveFn = () => {
    let result = 0;
    
    for (let i = 0; i < 10000; i++) {
      result += i;
    }
    console.log('result :', result);
    return result;
	}
	
	const base = useMemo(expensiveFn, [count]);

	
	return (
		<>
			<h1>{ title }</h1>
			<h1>{subTitle}</h1>
			<h1>count: {count}</h1>
      {/* <button onClick={() => setTitle(title + 1)}>改标题</button> */}
      <button onClick={() => setSubTitle(subTitle + 1)}>改副标题</button>
      <button onClick={() => {setCount(base + count)}}>改count</button>
      <ChildMemo onClick={onChangeTitle} name='桃桃'></ChildMemo>
		</>
	)
}