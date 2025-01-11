'use client'
import axios from 'axios'
import { useAppContext } from '../../Context/Context'
import Drawer from './Drawer/Drawer'
import Header from './Header/Header'

const Headers = () => {
	type contextType = {
		cartOpened: boolean
		setCartOpened: (open: boolean) => void
		setCartItems: any
		cartItems: item[]
	}
	type item = {
		id: number
		title: string
		imageUrl: string
		price: number
		name: string
	}
	const { cartOpened, setCartOpened, setCartItems, cartItems } =
		useAppContext() as contextType
	const onRemoveItem = (id: number) => {
		axios.delete(`http://localhost:3000/cart/${id}`)
		setCartItems(cartItems.filter(item => item.id !== id))
	}
	const onClickCart = () => {
		axios.get('http://localhost:3000/cart').then(res => {
			setCartItems(res.data)
		})
		setCartOpened(true)
	}
	return (
		<>
			<Header onClickCart={onClickCart} />
			{cartOpened && (
				<Drawer
					cartItems={cartItems}
					onCloseCart={() => setCartOpened(false)}
					onRemove={onRemoveItem}
				/>
			)}
		</>
	)
}

export default Headers
