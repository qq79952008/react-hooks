import React from 'react'
import {Typography, Checkbox} from 'antd'

interface CardItem {
	id: number,
	name: string, 
	price: number
}

interface Props {
  item: CardItem
  checked: boolean
  // onCheckedChange: OnCheckedChange<CardItem>
  onCheckedChange: any
}

// memo优化策略
function areEqual(prevProps: Props, nextProps: Props) {
  return (
    prevProps.item.id === nextProps.item.id && prevProps.checked === nextProps.checked
  )
}

const ItemCard = (props:Props) => {
	console.log('card item render')

	const {item, checked, onCheckedChange } = props

	const { price, name } = item

	const onWrapCheckChange = (e:any) => {
		onCheckedChange(item, e.target.checked)
	}
	return (
		<div className="item-card">
			<div className="check-wrap">
				<Checkbox checked={checked} onChange={onWrapCheckChange}/>
			</div>
			<p className="item-info">
	{name}<Typography.Text mark>${price}</Typography.Text>
			</p>
		</div>
	)
}

export default React.memo(ItemCard, areEqual)