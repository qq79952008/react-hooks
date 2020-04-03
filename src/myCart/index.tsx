import React, {useRef, useEffect, useState} from 'react'
import {List, Checkbox, Typography, Button} from 'antd'
import ItemCard from './itemCard'
import './index.css'
import { useChecked } from './use-checked'

const sumPrice = (data:Array<any>) => {
	return data.reduce((sum, cur) => {
		return sum + cur
	}, 0)
}
	
  
export default function MyCart(){
	
	const [cardData, setCardData] = useState(Array(5)
  .fill(undefined)
  .map((v, i) => ({
    id: i,
    name: `商品${i}`,
    price: Math.round(Math.random() * 100),
	})))

	const { 
		checkedMap, 
		onCheckedChange,
		onCheckedAllChange,
		checkedAll,
		filterCheckedMap
	} = useChecked(cardData)

	const onChangeCheckedRef = useRef(onCheckedChange)

	useEffect(() => {
		onChangeCheckedRef.current = onCheckedChange
	})


	let total = sumPrice(filterCheckedMap())

	const Footer = (
    <div className="footer">
      <div className="check-all">
				<Checkbox checked={checkedAll} onChange={onCheckedAllChange}/>
        全选
      </div>
      <div>
        价格总计 <Typography.Text mark>${total}</Typography.Text>
      </div>
    </div>
	)
	
	return (
		<div className="car">
			<List
			header={<div>我的</div>}
			footer={Footer}
			bordered
			dataSource={cardData}
			renderItem={item => ( 
				<List.Item>
					<ItemCard 
					item={item} 
					checked={
						checkedMap[item.id] || false
					} 
					onCheckedChange={(item:any, checked:boolean) => {onChangeCheckedRef.current(item, checked)}}></ItemCard>
				</List.Item>
			)}
			>

			</List>
			<Button onClick={() => {
				let newData = cardData.slice(1)
				console.log('newData :', newData);
				setCardData(
					newData
				)
			}}>1</Button>
		</div>
	)
}