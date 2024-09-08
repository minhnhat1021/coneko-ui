import images from '~/assets/images'

import { GoogleLogo, SpotifyLogo, SamsungLogo, NetflixLogo } from '~/components/Logos'
import {  TrustIconProcess, TrustIconNet, TrustIconAmenities, TrustIconPrice, TrustIconLocation, TrustIconLike, SearchIconLocation } from '~/components/Icons'
import Search from './Search'
import classNames from 'classnames/bind'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function Home() {
    return ( 
        <div className={cx('wrapper')}>
            
            <div className={cx('slider')}>
                <div className={cx('slider__content')}>
                    <h2>Đặt Phòng Phù Hợp Với Nhu Cầu Của Bạn</h2>
                    <Search />
                </div>
            </div>

            <div className={cx('container__bg-3')}>
                <div className={cx('content')}>
                    <div className={cx('amenities')}>
                        <div className={cx('amenities-item')}>
                            <div className={cx('amenities__text')}>
                                <h3 className={cx('amenities__highlight')}>Đã đến lúc thư giãn!</h3>
                                <h1 className={cx('amenities__title')}>Netflix and chill</h1>
                                <h3 className={cx('amenities__desc')}>Bao lâu rồi bạn chưa thực sự thư giãn? Hãy dành thời gian cho chính mình với những phút giây thư giãn tuyệt vời, trải nghiệm cảm giác thoải mái mà bạn xứng đáng có được</h3>
                            </div>
                            <div className={cx('amenities__img')}>
                                <img src={images.netflix} alt='Amenities'/>
                            </div>
                        </div>
                        <div className={cx('amenities-item')}>
                            <div className={cx('amenities__img')}>
                                <img src={images.luxuryBathtub} alt='Amenities'/>
                            </div>
                            <div className={cx('amenities__text')}>
                                <h3 className={cx('amenities__highlight')}>Nước ấm đã sẵn sàng</h3>
                                <h1 className={cx('amenities__title')}>Quên đi stress với không gian tắm chill </h1>
                                <h3 className={cx('amenities__desc')}>Quên đi stress với không gian tắm chill, nơi bồn tắm sang trọng và ánh sáng nhẹ nhàng tạo nên một trải nghiệm thư giãn tuyệt vời, giúp bạn xua tan mọi lo âu và tái tạo lại năng lượng</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={cx('container__bg-2')}>
                <div className={cx('content')}>
                    <div className={cx('new__rooms')}>
                        <header className={cx('new__rooms-header')}>
                            <h3 className={cx('new__rooms-highlight')}>BẠN ĐÃ THỬ CHƯA?!</h3>
                            <h1 className={cx('new__rooms-title')}>Phòng mới được trang bị nhiều tiện ích nhất</h1>
                            <h3 className={cx('new__rooms-desc')}>Phòng mới của chúng tôi được trang bị tiện ích hiện đại nhất, mang đến sự thoải mái và tiện nghi tối đa cho khách hàng</h3>

                        </header>
                        <main className={cx('new__rooms-body')}>
                            <div className={cx('room__list')}>             
                                <div className={cx('room__item')}>
                                    <header className={cx('room__header')}>
                                        <a href='/hotel-rooms/' className={cx('room__image')}>
                                            <img src={images.room}alt='{{this.name}}'/>
                                        </a>
                                        <div className={cx('room__price')}>
                                            <h1>500k</h1>
                                            <h3>/ ngày</h3>
                                        </div>
                                    </header>
                                    
                                    <main className={cx('room__body')}>
                                        <a href='/hotel-rooms/' className={cx('room__title')}>
                                            <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                                        </a>
                                        <div className={cx('room__star-rating')}>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                        </div>  
                                        <p className={cx('room__des')}>
                                            Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                                        </p>
                                    </main>
                                    <footer className={cx('room__footer')}>
                                        <div className={cx('room__overview')}>
                                            2 ngủ | netflix and chill | photo booth
                                        </div>
                                        
                                    </footer>
                                </div>
                                <div className={cx('room__item')}>
                                    <header className={cx('room__header')}>
                                        <a href='/hotel-rooms/' className={cx('room__image')}>
                                            <img src={images.room}alt='{{this.name}}'/>
                                        </a>
                                        <div className={cx('room__price')}>
                                            <h1>500k</h1>
                                            <h3>/ ngày</h3>
                                        </div>
                                    </header>
                                    
                                    <main className={cx('room__body')}>
                                        <a href='/hotel-rooms/' className={cx('room__title')}>
                                            <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                                        </a>
                                        <div className={cx('room__star-rating')}>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                        </div>  
                                        <p className={cx('room__des')}>
                                            Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                                        </p>
                                    </main>
                                    <footer className={cx('room__footer')}>
                                        <div className={cx('room__overview')}>
                                            2 ngủ | netflix and chill | photo booth
                                        </div>
                                        
                                    </footer>
                                </div>
                                <div className={cx('room__item')}>
                                    <header className={cx('room__header')}>
                                        <a href='/hotel-rooms/' className={cx('room__image')}>
                                            <img src={images.room}alt='{{this.name}}'/>
                                        </a>
                                        <div className={cx('room__price')}>
                                            <h1>500k</h1>
                                            <h3>/ ngày</h3>
                                        </div>
                                    </header>
                                    
                                    <main className={cx('room__body')}>
                                        <a href='/hotel-rooms/' className={cx('room__title')}>
                                            <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                                        </a>
                                        <div className={cx('room__star-rating')}>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                        </div>  
                                        <p className={cx('room__des')}>
                                            Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                                        </p>
                                    </main>
                                    <footer className={cx('room__footer')}>
                                        <div className={cx('room__overview')}>
                                            2 ngủ | netflix and chill | photo booth
                                        </div>
                                        
                                    </footer>
                                </div>
                                <div className={cx('room__item')}>
                                    <header className={cx('room__header')}>
                                        <a href='/hotel-rooms/' className={cx('room__image')}>
                                            <img src={images.room}alt='{{this.name}}'/>
                                        </a>
                                        <div className={cx('room__price')}>
                                            <h1>500k</h1>
                                            <h3>/ ngày</h3>
                                        </div>
                                    </header>
                                    
                                    <main className={cx('room__body')}>
                                        <a href='/hotel-rooms/' className={cx('room__title')}>
                                            <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                                        </a>
                                        <div className={cx('room__star-rating')}>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                        </div>  
                                        <p className={cx('room__des')}>
                                            Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                                        </p>
                                    </main>
                                    <footer className={cx('room__footer')}>
                                        <div className={cx('room__overview')}>
                                            2 ngủ | netflix and chill | photo booth
                                        </div>
                                        
                                    </footer>
                                </div>
                                <div className={cx('room__item')}>
                                    <header className={cx('room__header')}>
                                        <a href='/hotel-rooms/' className={cx('room__image')}>
                                            <img src={images.room}alt='{{this.name}}'/>
                                        </a>
                                        <div className={cx('room__price')}>
                                            <h1>500k</h1>
                                            <h3>/ ngày</h3>
                                        </div>
                                    </header>
                                    
                                    <main className={cx('room__body')}>
                                        <a href='/hotel-rooms/' className={cx('room__title')}>
                                            <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                                        </a>
                                        <div className={cx('room__star-rating')}>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                            <i className={cx('fa-solid fa-star')}></i>
                                        </div>  
                                        <p className={cx('room__des')}>
                                            Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                                        </p>
                                    </main>
                                    <footer className={cx('room__footer')}>
                                        <div className={cx('room__overview')}>
                                            2 ngủ | netflix and chill | photo booth
                                        </div>
                                        
                                    </footer>
                                </div>
                                
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <div className={cx('container__bg-3')}>
                <div className={cx('content')}>
                    <div className={cx('partners')}>
                        <p className={cx('partners__title')}>Những đối tác của chúng tôi</p>
                        <nav className={cx('partners__nav')}>
                            <div className={cx('partners__nav-item')}>
                                <GoogleLogo />
                            </div>
                            <div className={cx('partners__nav-item')}>
                                <SpotifyLogo />
                            </div>
                            <div className={cx('partners__nav-item')}>
                                <SamsungLogo />
                            </div>
                            <div className={cx('partners__nav-item')}>
                                <NetflixLogo />
                            </div>

                        </nav>
                    </div>
                </div>
            </div>  
            <div className={cx('container__bg-2')}>
                <div className={cx('content')}>
                    <div className={cx('trustworthy')}>
                        <h1 className={cx('trustworthy__title')}>Đem lại cho bạn sự an tâm</h1>
                        <div className={cx('trustworthy__list')}>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconProcess />
                                </div>
                                <h2>
                                    Đặt phòng dễ dàng!
                                </h2>
                                <p>
                                    Đặt phòng khách sạn với chúng tôi thật đơn giản và không rắc rối. Nền tảng trực tuyến của chúng tôi giúp bạn đặt phòng chỉ trong vài cú nhấp chuột.
                                </p>
                            </div>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconNet />
                                </div>
                                <h2>
                                    Cộng đồng của chúng tôi
                                </h2>
                                <p>
                                Tham gia vào cộng đồng khách hàng sôi động. Kết nối, chia sẻ trải nghiệm và khám phá các ưu đãi đặc biệt trong môi trường thân thiện và phát triển.
                                </p>
                            </div>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconAmenities />
                                </div>
                                <h2>  
                                    Tiện nghi hiện đại
                                </h2>
                                <p>
                                    Thưởng thức không gian nghỉ ngơi thoải mái với nhiều tiện nghi hiện đại. Internet tốc độ cao, nội thất công thái học với những bản nhạc với mọi lứa tuổi.                                
                                </p>
                            </div>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconPrice />
                                </div>
                                <h2>
                                    Giá tốt nhất
                                </h2>
                                <p>
                                    Không chắc nên đặt phòng với mức giá nào?! Hãy để chúng tôi làm điều đó cho bạn. Liên hệ với chúng tôi hôm nay để được tư vấn nhiều ưu đãi.
                                </p>
                            </div>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconLocation />
                                </div>
                                <h2>
                                    Vị trí đắc địa
                                </h2>
                                <p>
                                    Nằm ở trung tâm thành phố, gần khu du lịch và khu vui chơi. Rất thuận tiện cho việc khám phá các địa điểm tham quan và giải trí.                                </p>
                            </div>
                            <div className={cx('trustworthy__item')}>
                                <div>
                                    <TrustIconLike />
                                </div>
                                <h2>
                                    Khách hàng là thượng đế
                                </h2>
                                <p>
                                    Chúng tôi tin tưởng vào sự minh bạch. Giá cả của chúng tôi rõ ràng và không có phí ẩn. Những gì bạn thấy là những gì bạn nhận được, vì vậy bạn có thể lập kế hoạch ngân sách một cách tự tin.                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('support')}>
                <img src={images.primary2} alt='coneko'/>
                <div className={cx('support__container')}>
                    <header className={cx('support__header')}>
                        <h2>
                         Để chúng tôi tìm phòng nghỉ lý tưởng giúp bạn!</h2>
                        <p>
                            Hoàn tất biểu mẫu và đội ngũ của chúng tôi sẽ liên hệ với bạn ngay nhé!
                        </p>
                    </header>
                    <main className={cx('support__body')}>
                        <input type='text' placeholder='Họ tên'/>
                        <input type='text' placeholder='Số điện thoại'/>
                        <input type='text' placeholder='Email'/>
                        <input type='text' placeholder='Địa chỉ'/>
                        <input type='text' placeholder='Số lượng người'/>
                        <input type='text' placeholder='Sở thích'/>
                    </main>
                    <button className={cx('support__btn')}>Gửi đi</button>
                </div>
            </div>

        </div>
    )
}

export default Home