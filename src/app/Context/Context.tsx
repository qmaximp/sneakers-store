'use client'
import axios from 'axios'
import {
	ChangeEvent,
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

const appContext = createContext({})
type TProps = {
	children: ReactNode
}
type item = {
	id: number
	title: string
	imageUrl: string
	price: number
	favorited: boolean
	added: boolean
}
export const Context = ({ children }: TProps) => {
	const [cartItems, setCartItems] = useState<item[]>([])
	const [favoriteItems, setFavoriteItems] = useState<item[]>([])
	const [items, setItems] = useState<item[]>([])
	const [searchValue, setSearchValue] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [cartOpened, setCartOpened] = useState(false)
	const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true)
			const cartRespons = await axios.get('http://localhost:3000/cart')
			const favoriteRespons = await axios.get('http://localhost:3000/favorites')
			const itemsRespons = await axios.get('http://localhost:3000/items')
			setIsLoading(false)
			setFavoriteItems(favoriteRespons.data)
			setCartItems(cartRespons.data)
			setItems(itemsRespons.data)
		}
		fetchData()
	}, [setSearchValue])
	const clearSearchValue = () => {
		setSearchValue('')
	}
	const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	// const [isAdded, setIsAdded] = useState(false)
	const isItemAdded = (id: number) => {
		return cartItems.some(obj => +obj.id === +id)
	}

	return (
		<appContext.Provider
			value={{
				cartItems,
				setCartItems,
				favoriteItems,
				setFavoriteItems,
				items,
				setItems,
				searchValue,
				setSearchValue,
				isLoading,
				setIsLoading,
				cartOpened,
				setCartOpened,
				totalPrice,
				clearSearchValue,
				isItemAdded,
				onChangeSearchValue,
			}}
		>
			<>{children}</>
		</appContext.Provider>
	)
}

export const useAppContext = () => useContext(appContext)
