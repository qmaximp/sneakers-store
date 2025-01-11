'use client'
import removeSVG from '@/public/img/btn-remove.svg'
import searchSVG from '@/public/img/search.svg'
import Image from 'next/image'
import Card from './components/Card/Card'
import Content from './components/Content/Content'
import Headers from './components/Headers/Headers'
import { useAppContext } from './Context/Context'

export default function Home() {
	type item = { id: number; title: string; imageUrl: string; price: number }
	type contextType = {
		cartItems: item[]
		favoriteItems: item[]
		items: item[]
		searchValue: string
		clearSearchValue(): void
		onChangeSearchValue(): void
		isLoading: boolean
		isItemAdded: boolean
	}
	const {
		cartItems,
		favoriteItems,
		items,
		searchValue,
		clearSearchValue,
		onChangeSearchValue,
		isLoading,
	} = useAppContext() as contextType

	return (
		<>
			<Headers />
			<Content>
				<h1 className='text-uppercase'>
					{searchValue ? `search by:"${searchValue}"` : 'all sneakers'}
				</h1>
				<div className='search-block'>
					<Image alt='searchSVG' src={searchSVG}></Image>
					<input
						value={searchValue}
						onChange={onChangeSearchValue}
						type='text'
						placeholder='search...'
					/>
					{searchValue && (
						<Image
							onClick={clearSearchValue}
							className='cu-p clearSearch'
							width={20}
							height={20}
							src={removeSVG}
							alt='removeSVG'
						/>
					)}
				</div>
			</Content>
			<div className='sneakers'>
				{isLoading
					? [...Array(8)].map((items, i) => <div key={i}>{items}</div>)
					: items
							.filter(item =>
								item.title.toLowerCase().includes(searchValue.toLowerCase())
							)
							.map(item => (
								<Card
									id={item.id}
									key={item.id}
									imageUrl={item.imageUrl}
									title={item.title}
									price={item.price}
									favorited={favoriteItems.some(obj => +obj.id === +item.id)}
									added={cartItems.some(obj => +obj.id === +item.id)}
									type={'visible'}
								/>
							))}
			</div>
		</>
	)
}
