import { ReactNode } from 'react'
type TProps = {
	children: ReactNode
}

const Content = ({ children }: TProps) => {
	return (
		<div className='mb-40 mt-40 d-flex justify-between align-center fle x-wrap'>
			{children}
		</div>
	)
}

export default Content
