import styles from '@/src/app/components/Wrapper/Wrapper.module.scss'
import { ReactNode } from 'react'

type TProps = {
	children: ReactNode
}

const Wrapper = ({ children }: TProps) => {
	return (
		<div className={styles.wrapper}>
			<div>{children}</div>
		</div>
	)
}

export default Wrapper
