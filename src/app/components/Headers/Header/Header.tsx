import favoriteBtnSVG from '@/public/img/favoriteBtn.svg'
import groupSVG from '@/public/img/Group.svg'
import logoSVG from '@/public/img/logo.svg'
import userSVG from '@/public/img/Union.svg'
import styles from '@/src/app/components/Headers/Header/Header.module.scss'
import { useAppContext } from '@/src/app/Context/Context'
import Image from 'next/image'
import Link from 'next/link'

type TProps = {
	onClickCart(): void
}
type contextType = {
	totalPrice: number
}

const Header = ({ onClickCart }: TProps) => {
	const { totalPrice } = useAppContext() as contextType
	return (
		<header className={styles.header}>
			<div className='d-flex align-center'>
				<Link href={'/'}>
					<Image width={40} height={40} src={logoSVG} alt='logoSVG' />
				</Link>
				<div className={styles.headerLeft}>
					<h3 className='text-uppercase'>sneakers store</h3>
					<p>best store sneakers</p>
				</div>
			</div>
			<ul className='d-flex'>
				<li onClick={onClickCart} className='d-flex cu-p'>
					<Image width={18} height={18} src={groupSVG} alt='logoSVG' />
					<span className='ml-5'>{totalPrice}$</span>
				</li>
				<li className='d-flex'>
					<Link className='d-flex align-center cu-p' href='/favorite'>
						<Image
							width={18}
							height={18}
							src={favoriteBtnSVG}
							alt='favoriteBtnSVG'
						/>
						<span className='ml-5'>bookmarks</span>
					</Link>
				</li>
				<li className='d-flex'>
					<Link className='d-flex align-center cu-p' href='/orders'>
						<Image width={18} height={18} src={userSVG} alt='logoSVG' />
						<span className='ml-5'>profile</span>
					</Link>
				</li>
			</ul>
		</header>
	)
}

export default Header
