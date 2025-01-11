'use client'
import arrowBackSVG from '@/public/img/arrowBack.svg'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import Content from '../components/Content/Content'
import Headers from '../components/Headers/Headers'
import { useAppContext } from '../Context/Context'

type item = {
	id: number
	title: string
	imageUrl: string
	price: number
	name: string
}
type contextType = {
	favoriteItems: item[]
	cartItems: item[]
}
const Page = () => {
	const { favoriteItems, cartItems } = useAppContext() as contextType
	const [orderItems, setOrderItems] = useState<item[]>([])
	useEffect(() => {
		;(async () => {
			const { data } = await axios.get('http://localhost:3000/orders')
			setOrderItems(data.reduce((prev, obj) => [...prev, ...obj.items], []))
		})()
	}, [])
	return (
		<>
			<div>
				<Headers />
				<Content>
					<h1 className='text-uppercase d-flex align-center '>
						<Link href={'/'} className='d-flex mr-20 align-center'>
							<Image
								width={40}
								height={40}
								src={arrowBackSVG}
								alt='arrowBackSVG'
							/>
						</Link>
						My bookmarks
					</h1>
				</Content>
			</div>
			<div className='sneakers'>
				{orderItems.map(item => (
					<Card
						id={item.id}
						key={item.id}
						imageUrl={item.imageUrl}
						title={item.title}
						price={item.price}
						favorited={favoriteItems.some(obj => obj.id === item.id)}
						added={cartItems.some(obj => obj.id === item.id)}
						type={'invisible'}
					/>
				))}
			</div>
		</>
	)
}

export default Page
