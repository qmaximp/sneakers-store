'use client'
import btnChecked from '@/public/img/btn-checked.svg'
import btnPlus from '@/public/img/btn-plus.svg'
import heartLikedSVG from '@/public/img/heart-liked.svg'
import heartUnlikedSVG from '@/public/img/heart-unliked.svg'
import styles from '@/src/app/components/Card/Card.module.scss'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { useAppContext } from '../../Context/Context'

type item = {
	id: number
	title: string
	imageUrl: string
	price: number
	favorited: boolean
	added: boolean
	type: any
}
type contextType = {
	isLoading: boolean
}
const Card = ({ id, title, imageUrl, price, favorited, added, type }: item) => {
	const { isLoading } = useAppContext() as contextType
	const [isAdded, setIsAdded] = useState(added)
	const [isFavorite, setIsFavorite] = useState(favorited)
	const [cartItems, setCartItems] = useState<item[]>([])
	const [favorites, setFavorites] = useState<item[]>([])
	useEffect(() => {
		axios.get('http://localhost:3000/cart').then(res => {
			setCartItems(res.data)
		})
		axios.get('http://localhost:3000/favorites').then(res => {
			setFavorites(res.data)
		})
	}, [])
	const onAddToCart = (obj: item) => {
		if (cartItems.find(cartObj => +cartObj.id === +obj.id)) {
			axios.delete(`http://localhost:3000/cart/${obj.id}`)
			setCartItems(cartItems.filter(item => +item.id !== +obj.id))
		} else {
			axios.post('http://localhost:3000/cart', obj)
			setCartItems([...cartItems, obj])
		}
	}
	const onAddToFavorite = (obj: item) => {
		console.log(favorites)
		if (favorites.find(favObj => +favObj.id === +obj.id)) {
			axios.delete(`http://localhost:3000/favorites/${obj.id}`)
			setFavorites(favorites.filter(item => +item.id !== +obj.id))
		} else {
			axios.post('http://localhost:3000/favorites', obj)
			setFavorites([...favorites, obj])
		}
	}
	const onClickPlus = () => {
		onAddToCart({ id, title, imageUrl, price, favorited, added, type })
		setIsAdded(!isAdded)
	}
	const onClickFavorite = () => {
		onAddToFavorite({ id, title, imageUrl, price, favorited, added, type })
		setIsFavorite(!isFavorite)
	}

	return (
		<div className={styles.card}>
			{isLoading ? (
				<ContentLoader
					speed={2}
					width={133}
					height={220}
					viewBox='0 0 133 220'
					backgroundColor='#c2edff'
					foregroundColor='#00c2bb'
				>
					<rect x='0' y='110' rx='5' ry='5' width='130' height='15' />
					<rect x='0' y='0' rx='10' ry='10' width='130' height='103' />
					<rect x='0' y='130' rx='5' ry='5' width='130' height='15' />
					<rect x='0' y='150' rx='5' ry='5' width='130' height='15' />
					<rect x='0' y='180' rx='7' ry='7' width='58' height='35' />
					<rect x='95' y='180' rx='7' ry='7' width='35' height='35' />
				</ContentLoader>
			) : (
				<>
					<div className={styles.favorite}>
						{type === 'visible' ? (
							<Image
								onClick={onClickFavorite}
								src={isFavorite ? heartLikedSVG : heartUnlikedSVG}
								alt='heartUnlikedSVG'
							/>
						) : type === 'invisible' ? null : null}
					</div>
					<Image width={133} height={112} src={imageUrl} alt='' />
					<h5 className='mb-10'>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className=' d-flex flex-column'>
							<p>price:</p>
							<b>{price}$</b>
						</div>
						{type === 'visible' ? (
							<Image
								onClick={onClickPlus}
								src={isAdded ? btnPlus : btnChecked}
								alt='btnChecked'
							/>
						) : type === 'invisible' ? null : null}
					</div>
				</>
			)}
		</div>
	)
}

export default Card
