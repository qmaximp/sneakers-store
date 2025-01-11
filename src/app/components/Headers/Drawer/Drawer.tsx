import arrowSVG from '@/public/img/arrow.svg'
import removeSVG from '@/public/img/btn-remove.svg'
import cartEmpty from '@/public/img/CartEmpty.svg'
import orderComplete from '@/public/img/orderComplete.svg'
import styles from '@/src/app/components/Headers/Drawer/Drawer.module.scss'
import { useAppContext } from '@/src/app/Context/Context'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import Info from '../../Info/Info'

type cartItems = { id: number; title: string; imageUrl: string; price: number }
type TProps = {
	onCloseCart(): void
	cartItems: cartItems[]
	onRemove: any
}
type contextType = {
	setCartItems: any
	cartItems: cartItems[]
	totalPrice: number
}
const Drawer = ({ onCloseCart, onRemove, items = [] }: TProps) => {
	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
	const { setCartItems, cartItems, totalPrice } = useAppContext() as contextType
	const [IsCompleteOrder, setIsCompleteOrder] = useState(false)
	const [orderId, setOrderID] = useState(null)
	const onClickOrder = async () => {
		try {
			const { data } = await axios.post('http://localhost:3000/orders', {
				items: cartItems,
			})
			setOrderID(data.id)
			setIsCompleteOrder(true)
			setCartItems([])
			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i]
				await axios.delete('http://localhost:3000/cart/' + item.id)
				await delay(100)
			}
		} catch (error) {
			alert('err orders')
		}
	}

	return (
		<div className={styles.drawer}>
			<div className={styles.drawerBlock}>
				<h2 className='mb-30 d-flex justify-between'>
					CART
					<Image
						onClick={onCloseCart}
						className='cu-p'
						src={removeSVG}
						alt='removeSVG'
					/>
				</h2>
				{cartItems.length > 0 ? (
					<>
						<div className={styles.items}>
							{cartItems.map((obj, i) => (
								<div key={i} className={styles.cartItem}>
									<Image
										width={83}
										height={70}
										src={obj.imageUrl}
										alt='plusSVG'
									/>
									<div>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} $</b>
									</div>
									<Image
										className={styles.removeBtn}
										src={removeSVG}
										alt='removeSVG'
										onClick={() => onRemove(obj.id)}
									/>
								</div>
							))}
						</div>
						<div className={styles.cartTotalBlock}>
							<ul>
								<li className='d-flex'>
									<span>Total:</span>
									<div></div>
									<b>{totalPrice}$</b>
								</li>
								<li className='d-flex'>
									<span>Tax 5%:</span>
									<div></div>
									<b>{Math.round(totalPrice / 100) * 5}$</b>
								</li>
							</ul>
							<button onClick={onClickOrder} className={styles.greenButton}>
								Place an order
								<Image src={arrowSVG} alt='arrowSVG' width={13} height={13} />
							</button>
						</div>
					</>
				) : (
					<Info
						title={
							IsCompleteOrder
								? 'The order has been placed!'
								: 'The basket is empty'
						}
						descripteon={
							IsCompleteOrder
								? `Your order #${orderId} will be delivered by courier soon.`
								: 'Add at least one pair of sneakers to make an order.'
						}
						image={IsCompleteOrder ? orderComplete : cartEmpty}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
