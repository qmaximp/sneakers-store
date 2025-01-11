import arrowSVG from '@/public/img/arrow.svg'
import styles from '@/src/app/components/Info/Info.module.scss'
import Image from 'next/image'
import { useAppContext } from '../../Context/Context'

type contextType = {
	setCartOpened: (open: boolean) => void
}

type TProps = {
	title: string
	descripteon: string
	image: string
}
const Info = ({ title, descripteon, image }: TProps) => {
	const { setCartOpened } = useAppContext() as contextType
	return (
		<div className={styles.cartEmpty}>
			<Image src={image} alt='arrowSVG' width={120} height={120} />
			<h2>{title}</h2>
			<p>{descripteon}</p>
			<button
				onClick={() => setCartOpened(false)}
				className={styles.greenButton}
			>
				Go back
				<Image src={arrowSVG} alt='arrowSVG' width={13} height={13} />
			</button>
		</div>
	)
}

export default Info
