import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
            setSearchResult([])
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

    const handleChange = (e) => {
        const searchValue = e.target.value
        if(!searchValue.startsWith(' ') || searchValue.trim()) {
            setSearchValue(searchValue) 
        }
    }
    
    const handleSubmit = () => {

    }
    return ( 
        <HeadlessTippy 
            visible={showResult && searchResult.length > 0}
            interactive
            placement='bottom-start'
            render={attrs => (
                    <div className={cx('search__result')} tabIndex='-1' {...attrs}>
                        <h3 className={cx('result__title')}>kết quả tìm kiếm</h3>
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
                    onChange={handleChange} 
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
                <button onClick={handleSubmit}>Tìm kiếm</button>
            </div>
        </HeadlessTippy >
    )
}

export default Search;