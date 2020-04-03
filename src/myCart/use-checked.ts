import {useState, useEffect, useCallback} from 'react'

type CheckedMap = {
	[id:number]: boolean
}
type cardItem = {
	id:number
}
type onCheckedChange<T> = (item:T, checked: boolean) => any



export const useChecked = (cardData: Array<any>) => {
	const [checkedMap, setCheckedMap] = useState<CheckedMap>(function init(){
		let initCheckedMap:CheckedMap = {}
		cardData.forEach((item:cardItem) => {
			initCheckedMap[item.id] = false
		})
		return initCheckedMap
	})


	const [checkedAll, setCheckAll] = useState(false)


		//勾选
	const onCheckedChange = (cardItem:any, checked:boolean) => {
		const { id } = cardItem
		const newCheckedMap = Object.assign({}, checkedMap, {
			[id]:checked
		})
		setCheckAll(Object.keys(newCheckedMap).every((key:any) => {
			return newCheckedMap[key]
		}))
		setCheckedMap(newCheckedMap)
	}

	//全选或反选
	const onCheckedAllChange = (e:any) => {
		let newCheckedMap:CheckedMap = {}
		cardData.forEach((item:cardItem) => {
			newCheckedMap[item.id] = e.target.checked
		})
		setCheckAll(e.target.checked)
		setCheckedMap(newCheckedMap)
	}

	const filterChecked = () => {
		return Object.keys(checkedMap).filter((key:any) => {
			return checkedMap[key]
		}).map((key:any) => {
			let price
			cardData.some((item:any) => {
				if(item.id === Number(key)){
					price = item.price
					return true
				}
				return false
			})
			return price
		})
	}

	const filterCheckedMap = useCallback(filterChecked, [checkedMap])

	useEffect(() => {
		console.log('cardData', cardData)
		let newCheckedMap:CheckedMap = {}
		cardData.forEach((item:cardItem) => {
			newCheckedMap[item.id] = checkedMap[item.id]
		})
		setCheckAll(Object.keys(newCheckedMap).every((key:any) => {
			return newCheckedMap[key]
		}))
		console.log('newCheckedMap', newCheckedMap)
		setCheckedMap(newCheckedMap)
	}, [cardData])


	return {
		onCheckedChange,
		checkedMap,
		onCheckedAllChange,
		checkedAll,
		filterCheckedMap
	}
} 