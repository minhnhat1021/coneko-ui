import { useEffect, useRef, useState } from 'react';
import { Await, Link } from 'react-router-dom';
import HeadlessTippy from '@tippyjs/react/headless';


import { useDebounce } from '~/hooks'
import * as searchService from '~/apiServices/searchService'
import {Wrapper as PopperWrapper} from '~/components/Popper'

import { SearchIconLocation, Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './Search.module.scss'

const cx = classNames.bind(styles)

function Search() {

    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const inputRef = useRef()

    const debounced = useDebounce(searchValue, 500)

    useEffect(() => {
        if(!searchValue.trim()){
            return 
        }
        
        const fetchApi = async () => {
            setIsLoading(true)

            const result = await searchService.roomSearch(debounced)
            setSearchResult(result)
            setIsLoading(false)
        }
        fetchApi()
        
    }, [debounced])
    
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }
    return ( 
        <HeadlessTippy 
            trigger={'click'} 
            visible={showResult && searchResult.length > 0}
            interactive
            placement='bottom-start'
            render={attrs => (
                    <div className={cx('search__result')} tabIndex='-1' {...attrs}>
                        <div className={cx('result__title')}>kết quả tìm kiếm</div>
                        {searchResult.map((result) => (
                            <Link to={`/hotel-rooms/${result.name}`} key={result._id} className={cx('result__item')}>
                                <div className={cx('room__name', 'result__info')}>{result.name}</div>
                                <div className={cx('room__overView', 'result__info')}>{result.overView}</div>
                                <div className={cx('room__bedType', 'result__info')}>Giường {result.bedType}</div>
                                <div className={cx('room__capacity', 'result__info')}>Sức chứa {result.capacity} người</div>
                                <div className={cx('room__bedCount', 'result__info')}>{result.bedCount} Giường</div>
                                <div className={cx('room__bedCount', 'result__info')}>{result.bedCount}</div>
                            </Link>
                        ))}
                    </div>
            )}
            onClickOutside={handleHideResult}
            
        >
            <div className={cx('search')}>
                <SearchIconLocation />
                <input 
                    ref={inputRef}
                    type="text" 
                    value={searchValue} 
                    onChange={(e) => {
                        setSearchValue(e.target.value) 
                        if(e.target.value === '') {
                            setSearchResult([])
                        }
                    }} 
                    placeholder='Tìm kiếm phòng' 
                    onFocus={() => setShowResult(true)}
                />
                {!!isLoading && <Loading className='loading'/> }
                {!!searchValue && !isLoading &&(
                    <i 
                        className={cx('fa-solid fa-circle-xmark', 'Clear')}
                        onClick={handleClear}
                    ></i>
                )} 
                <button>Tìm kiếm</button>
            </div>
        </HeadlessTippy >
    )
}

export default Search;