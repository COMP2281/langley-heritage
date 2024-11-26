import { useState } from "react"

function List()
{
	let [items, setItems] = useState([])

	function OnNewItem()
	{
		setItems(oldItems => {
			let newItems = oldItems.slice()
			newItems.push("Hello!")
			return newItems
		})
	}

	return (
		<>
			<button onClick={OnNewItem}>Add Item</button>
			<ul>
				{items.map((item, id) => <li key={id}>{item}</li>)}
			</ul>
		</>
	)
}

export default List