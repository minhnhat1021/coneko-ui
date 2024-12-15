import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as roomService from '~/apiServices/roomService'
import * as userService from '~/apiServices/userService'

import { DatePicker, InputNumber, Button, Row, Col, Card,Typography, Rate, Tag, Space, Checkbox, Drawer, List, Image, Modal } from "antd"
import { CameraOutlined, CheckOutlined, EnvironmentOutlined, EyeOutlined, TeamOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import moment from "moment"
import "antd/dist/reset.css"
import './HotelRooms.css'
import classNames from 'classnames/bind'
import styles from './HotelRooms.module.scss'
// import Button from '~/components/Button'
const { Title, Text } = Typography;
const cx = classNames.bind(styles)

function HotelRooms() {
    const token = localStorage.getItem('token')
    
    const [roomData, setRoomData] = useState([])
    const [roomFilter, setRoomFilter] = useState([])
    const [userData, setUserData] = useState([])
    const [selectedRoom, setSelectedRoom] = useState({})
    const [open, setOpen] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)
    
    useEffect(() => {
        const fetchApi = async() => {
            if (token ) {
                const res = await userService.userDetail( token )
                setUserData(res)
            }
        }
        fetchApi()
    } ,[])
    useEffect(() => {
        const fetchApi = async () => {
            const result = await roomService.roomList()
            setRoomData(result.rooms)
            setRoomFilter(result.rooms)
        }

        fetchApi()
    }, [])


    // options 
    const [options, setOptions] = useState({
        standard: false,
        elegance: false,
        skyviewSuite: false,
        singleBed: false,
        doubleBed: false,
        oneBed: false,
        twoBed: false,
        smoke: false,
        noSmoking: false,
    })

    useEffect(() => {
        var optionInputs = document.querySelectorAll('[name][options]')
        for(var optionInput of optionInputs) {
            optionInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked

                setOptions(prev => ({
                    ...prev,
                    [name]: isChecked 
                }))
            }
        }
    }, [])

    useEffect(() => {
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await roomService.filterRoomsByOptions(filters)
            setRoomData(res?.rooms)
    
        }
        handleFilter()
    },[options])

    // Tìm phòng
    const [checkInDate, setCheckInDate] = useState()
    const [checkOutDate, setCheckOutDate] = useState()
    const [stayDays, setStayDays] = useState(0)
    const [peopleCount, setPeopleCount] = useState(0)

    useEffect(() => {
        const stayDays = Math.ceil((checkOutDate - checkInDate)/(24 * 60 *60 * 1000))
        setStayDays(stayDays)
        if(checkInDate && checkOutDate) {
            const rooms = roomData?.filter(room => {
                return room?.bookedUsers?.every(booking => {
                    return checkInDate > new Date(booking?.checkOutDate) || checkOutDate < new Date(booking?.checkInDate) 
                })
            })
            setRoomFilter(rooms)
        }
    }, [checkInDate, checkOutDate])

    const handleFindRoom = () => {
        const capaty = [4, 2]

        let current = []
        let sum = 0

        while(sum < peopleCount) {
            current.push(capaty[0])
            sum += capaty[0]
        }
        if(sum > peopleCount) {
            if(sum - capaty[0] + capaty[1] >= peopleCount){
                current.pop()
                current.push(capaty[1])
                sum = sum - capaty[0] + capaty[1]
            } 
        } 
        const counts = {}
        for (const item of current) {
            counts[item] = (counts[item] || 0) + 1
        }

        if(peopleCount === null || peopleCount === 0) {
            if(!checkInDate || !checkOutDate) {
                setRoomFilter(roomData)
                setSelectedRooms([])

                return
            }
            const rooms = roomData?.filter(room => {
                return room?.bookedUsers?.every(booking => {
                    return checkInDate > new Date(booking?.checkOutDate) || checkOutDate < new Date(booking?.checkInDate) 
                })
            })
            setRoomFilter(rooms)
            setSelectedRooms([])
            
        } else if(peopleCount > 0) {
            const rooms = roomData?.filter(room => {
                return room?.bookedUsers?.every(booking => {
                    return checkInDate > new Date(booking?.checkOutDate) || checkOutDate < new Date(booking?.checkInDate) 
                })
            })

            if(!checkInDate || !checkOutDate) {
                setRoomFilter(roomData)
                setSelectedRooms([])
                return
            }
            const roomFilter = Object?.entries(counts)?.map(([capa, count]) => {
                return rooms?.filter(room => {
                    return room?.capacity === capa
                })?.slice(0, count)
            }).reduce((acc, arr) => { return acc.concat(arr)}, [])
            setRoomFilter(roomFilter)
            setSelectedRooms([...roomFilter])

        }
        
    }
    // const formattedDate = (date) => {
    //     return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    // } 
    // Checkbox
    let [selectedRooms, setSelectedRooms] = useState ([]) 
    const handleSelectRoom = (e, room) => {
        const isChecked = e.target.checked
        if(isChecked) {
            setSelectedRooms(prev => [...prev, room])
        }
        else {
            setSelectedRooms(prev => 
                prev?.filter(selectedRoom => selectedRoom?._id !== room?._id)
            )
        }
    }
    const handleCheckInDate = (date, dateString) => {
        
        if(date?.$d){
            const vietnamDate = new Date(date?.$d.getTime() + 7 * 60 * 60 * 1000)
            vietnamDate.setHours(12, 0, 0, 0)
            setCheckInDate(vietnamDate)
        } else {
            setCheckInDate(date)
        }
    }
    const handleCheckOutDate = (date, dateString) => {
        if(date?.$d){
            const vietnamDate = new Date(date?.$d.getTime() + 7 * 60 * 60 * 1000)
            vietnamDate.setHours(10, 0, 0, 0)
            setCheckOutDate(vietnamDate)
        } else {
            setCheckOutDate(date)
        }
    }

    // Booking room
    const discountRates = {
        normal: 0,
        silver: 5,
        gold: 10,
        platinum: 15,
        diamond: 18,
        vip: 20
    }
    const navigate = useNavigate()
    const handleBooking = () => {
        const discountRate = discountRates[userData?.level]
        const roomCharge = (selectedRooms?.reduce((acc, room) => acc + room?.price, 0) * stayDays)
        const discountAmount = (roomCharge * discountRate) /100
        const totalPrice = roomCharge - discountAmount
        const deposit = (totalPrice * 40) / 100
        const outstandingBalance = totalPrice - deposit
        navigate(`/checkout`, {
            state: { startDate: checkInDate, endDate: checkOutDate, days: stayDays , roomCharge, totalPrice, deposit, outstandingBalance, discountRate, discountAmount,  userData , selectedRooms }
        })
    }
    
    // validate date
    const disabledDateCheckIn = (current) => {
        const minDate = moment()
        let maxDate = null
        if(checkOutDate){
            maxDate = moment(checkOutDate).subtract(1, "days")
        }
        return current && (current.isBefore(minDate, "day") || current.isAfter(maxDate, "day"))
    }
    const disabledDateCheckOut = (current) => {
        let minDate = moment().add(1, "days")
        if(checkInDate){
            minDate = moment(checkInDate).add(1, "days")
        }
        return current && (current.isBefore(minDate, "day"))
    }
    const handleClickRoom = (room) => {
        console.log(room)
        setSelectedRoom(room)
        setOpen(true)
    }
    const handleCurrentImage = (item) => {
        if(item) {
            const index = Object?.values?.(selectedRoom?.images || {}).indexOf(item)
        setCurrentImage(index)
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('page-title')}>
                <h1 >Sự Kỳ Diệu Của Nghỉ Dưỡng: Chọn Phòng Của Bạn Ngay Hôm Nay! </h1>
                <p>Tận hưởng sự thoải mái trong phòng nghỉ sang trọng. Đặt ngay để trải nghiệm dịch vụ và tiện ích đẳng cấp!</p>
            </div>
            <div className={cx('container')}>
                <div className={cx('find__room')}>
                    <div style={{ padding: "20px", borderRadius: "8px" }}>
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <label>Ngày nhận phòng</label>
                                <DatePicker 
                                    style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}  
                                    placeholder="Chọn ngày nhận" 
                                    onChange={handleCheckInDate}
                                    format="DD-MM-YYYY" 
                                    disabledDate={disabledDateCheckIn}
                                />
                            </Col>
                            <Col span={8}>
                                <label>Ngày trả phòng</label>
                                <DatePicker 
                                    style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}  
                                    placeholder="Chọn ngày trả" 
                                    onChange={handleCheckOutDate}
                                    format="DD-MM-YYYY" 
                                    disabledDate={disabledDateCheckOut}

                                />
                            </Col>
                            <Col span={8} style={{ display: 'flex', alignItems: 'flex-end'}}>
                                <Row style={{flex: '1'}}>
                                    <Col span={24}>
                                        <Button type="primary" onClick={handleFindRoom}  style={{ width: '100%', height: '40px', fontSize: '16px' }}>
                                            Tìm kiếm phòng
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col span={16}>
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <label>Số lượng khách</label>
                                        <InputNumber 
                                            min={1} 
                                            value={peopleCount} 
                                            style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px', marginTop: '10px' }} 
                                            onChange={(value) => setPeopleCount(value)} 
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <label>Số đêm</label>
                                        <InputNumber readOnly min={1} value={stayDays > 0 ? stayDays : 0} style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}  />
                                    </Col>
                                    <Col span={8}>
                                        <label>Số phòng</label>
                                        <InputNumber readOnly min={1} value={selectedRooms?.length > 0 ? selectedRooms?.length : 0} style={{ width: '100%', height: '40px', fontSize: '16px', marginTop: '10px' }}  />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={8}  style={{ display: 'flex', alignItems: 'flex-end'}}>
                                <Button 
                                    type="default" 
                                    onClick={handleBooking}  
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        backgroundColor: !selectedRooms?.length ? '#d9d9d9' : '#D89B1C', 
                                        color: !selectedRooms?.length ? 'white' : 'white', 
                                        borderColor: !selectedRooms?.length ? '#bfbfbf' : '#D89B1C' ,
                                        transition: 'all 0.3s ease-in-out'
                                    }}
                                    disabled={!selectedRooms?.length} 
                                >
                                    Đặt phòng
                                </Button>
                            </Col>
                            
                        </Row>
                    </div>
                </div>
                
                {/* <div className={cx('options')} id='options'>
                    <div className={cx('option__item')}>
                        <input id='standard' name='standard' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='standard' className={cx('options__label')}></label>
                        <p>Standard</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='elegance' name='elegance' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='elegance' className={cx('options__label')}></label>
                        <p>Elegance</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='skyviewSuite' name='skyviewSuite' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='skyviewSuite' className={cx('options__label')}></label>
                        <p>Skyview Suite</p>
                    </div>
                    <br></br>
                    <div className={cx('option__item')}>
                        <input id='singleBed' name='singleBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='singleBed' className={cx('options__label')}></label>
                        <p>Giường đơn</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='doubleBed' name='doubleBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='doubleBed' className={cx('options__label')}></label>
                        <p>Giường đôi</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='oneBed' name='oneBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='oneBed' className={cx('options__label')}></label>
                        <p>1 giường</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='twoBed' name='twoBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='twoBed' className={cx('options__label')}></label>
                        <p>2 giường</p>
                    </div>
                    
                    <br></br>
                    <div className={cx('option__item')}>
                        <input id='smoke' name='smoke' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='smoke' className={cx('options__label')}></label>
                        <p>Hút thuốc</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='noSmoking' name='noSmoking' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='noSmoking' className={cx('options__label')}></label>
                        <p>Không hút thuốc</p>
                    </div>
                </div> */}
                <div >
                    {roomFilter.length > 0 ? 
                    <>
                        {roomFilter?.map((room) => (
                            <Card
                                key={room?._id}
                                style={{ marginBottom: "20px" }}
                                bordered={false}
                                styles={{ body: { padding: '20px' } }}
                                className="hotelRooms-roomItem"
                            >
                                <Row gutter={16}>
                                    <Col xs={10} lg={8}>
                                        <div style={{ position: "relative" }}>
                                            <img
                                                src={`${process.env.REACT_APP_IMAGES_URL}${room?.images?.image1}`}
                                                alt={room?.name}
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    borderRadius: "8px",
                                                    cursor: "pointer",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Button
                                                type="link"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "10px",
                                                    right: "10px",
                                                    color: "white",
                                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                Xem ảnh
                                            </Button>
                                        </div>
                                        <Row gutter={8} style={{ marginTop: "8px" }}>
                                                {Object?.values?.(room?.images)?.slice(0, 3)?.map((image,index) => {
                                                    return (
                                                        <Col  span={8}>
                                                            <img
                                                                src={`${process.env.REACT_APP_IMAGES_URL}${image}`}
                                                                alt={`Ảnh `}
                                                                style={{
                                                                    width: "100%",
                                                                    height: "80px",
                                                                    borderRadius: "8px",
                                                                    objectFit: "cover",
                                                                    cursor: "pointer",
                                                                }}
                                                            />
                                                        </Col>
                                                    )
                                                })}
                                        </Row>
                                    </Col>
                                    <Col xs={24} lg={10} style={{ borderRight: "1px solid #f1f1f1", marginLeft: '20px'}}>
                                        <h3>phòng {room?.name}</h3>
                                        <h3><UsergroupDeleteOutlined style={{marginRight: '10px', color: '#fcb716'}}/>
                                            {room?.capacity} khách <span style={{color: '#dd6565'}}>({room?.bedType} - {room?.bedCount} giường)</span>
                                        </h3>
                                        <Rate
                                            allowHalf
                                            disabled
                                            defaultValue={room?.rating}
                                            style={{ fontSize: "14px" }}
                                        />
                                        <span style={{ marginLeft: "8px", color: "#1890ff" }}>
                                            ({room?.rating} sao)
                                        </span>
                                        <p>
                                            <EnvironmentOutlined style={{ marginTop: '10px' }}/> Nguyễn Xiển, Thanh Xuân
                                        </p>
                                        <Space wrap style={{ margin: '10px 0 25px 0'}}>
                                            {room?.amenities?.map((tag, index) => (
                                            <Tag key={index} color="blue">
                                                {tag}
                                            </Tag>
                                            ))}
                                        </Space>
                                        <p style={{ marginTop: "8px", color: "#03e503", fontWeight: '600' }}>
                                            <CheckOutlined style={{ fontSize: '12px', marginRight: '5px', fontWeight: '600' }}/>
                                            Miễn phí hủy phòng
                                        </p>
                                        <p style={{ marginTop: "8px", color: "#03e503", fontWeight: '600' }}>
                                            <CheckOutlined style={{ fontSize: '12px', marginRight: '5px', fontWeight: '600' }}/>
                                            Không thanh toán ngay
                                        </p>
                                        <Button type='link' onClick={() => handleClickRoom(room)} style={{ marginTop: "8px", color: "#1890ff", fontWeight: '600', padding: '0' }}>
                                            <EyeOutlined style={{ fontSize: '12px', marginRight: '5px', fontWeight: '600' }}/>
                                            Xem chi tiết
                                        </Button>
                                    </Col>
    
                                    <Col xs={24} lg={5} style={{ textAlign: "end", display: 'flex', flexDirection: 'column', justifyContent: 'end',alignItems: 'end', paddingLeft: '10px' }}>
                                            <p style={{ textDecoration: "line-through", color: "#999" }}>
                                                {room?.originPrice?.toLocaleString()} VND
                                            </p>
                                            <p style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}>
                                                {room?.price?.toLocaleString()} VND
                                            </p>
                                            <Checkbox 
                                                checked={selectedRooms?.map(room => room?._id).includes(room._id)}  
                                                onChange={(e) => handleSelectRoom(e, room)} 
                                                style={{ marginTop: "10px", color: '#fff' }}
                                                disabled={!checkInDate || !checkOutDate}
                                            >   
                                                Chọn phòng
                                            </Checkbox>
                                        
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </> 
                    :  (<div
                            style={{
                            textAlign: "center",
                            padding: "20px",
                            backgroundColor: "#fafafa",
                            border: "1px solid #f0f0f0",
                            borderRadius: "8px",
                            marginTop: "20px",
                            }}
                        >
                            <h3 style={{ color: "#ff4d4f", fontSize: "18px" }}>
                            Không còn phòng trống trong khoảng thời gian đã chọn
                            </h3>
                            <p style={{ color: "#999", fontSize: "14px" }}>
                            Vui lòng thử lại với khoảng thời gian khác.
                            </p>
                        </div>)
                    }
                </div>
                <Modal 
                    title={`Chi tiết phòng ${selectedRoom?.name}`} 
                    open={open} 
                    onCancel={() => setOpen(false)} 
                    width={900} 
                    style={{backgroundColor: '#3b3b3b', borderRadius: '12px'}}
                    footer={null}
                >
                    <Row gutter={[24, 16]}>
                        <Col span={16}>
                            <Image 
                                src={`${process.env.REACT_APP_IMAGES_URL}${Object.values(selectedRoom?.images || {})?.[currentImage]}`} 
                                width="100%" 
                                height={350} 
                                style={{ objectFit: 'cover', borderRadius: '12px' }} 
                            />
                            <List
                                grid={{ gutter: 1, column: 5 }}
                                dataSource={Object?.values?.(selectedRoom?.images || {})}
                                renderItem={(item) => (
                                    <List.Item style={{margin: '0 6px'}}>
                                        <Image
                                            src={`${process.env.REACT_APP_IMAGES_URL}${item}`}
                                            width={'100%'}
                                            height={80}
                                            style={{ cursor: 'pointer', objectFit: 'cover', borderRadius: '12px'}}
                                            onClick={() => handleCurrentImage(item)}
                                            preview={false}
                                        />
                                    </List.Item>
                                )}
                                style={{ margin: '10px -6px 0 -6px'}}
                            />
                        </Col>
    
                        <Col span={8}>
                            <Space direction="vertical" size="large" style={{ marginTop: 20 }}>
                                <Row style={{borderBottom: '1px solid #999', paddingBottom: '20px'}}>
                                    <Col span={24}>
                                        <Text strong>
                                            Diện tích: {selectedRoom?.size} m²
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong>
                                            <TeamOutlined /> {selectedRoom?.capacity} khách
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong>
                                            Loại giường: {selectedRoom?.bedType}
                                        </Text>
                                    </Col>
                                    <Col span={24}>
                                        <Text strong>
                                            Số lượng giường: {selectedRoom?.bedCount} giường
                                        </Text>
                                    </Col>
                                </Row>
        
                                <Row style={{borderBottom: '1px solid #999', paddingBottom: '20px'}}>
                                    <Col span={24}>
                                        <Title level={5}>Tiện nghi cơ bản</Title>
                                        {selectedRoom?.amenities?.map((amenitie) => {
                                            return <li style={{color: '#fff'}}>{amenitie}</li>
                                        })}
                                    </Col>
                                </Row>
                                <Row style={{marginTop: '65px'}}>
                                    <Col span={24}>
                                            <Title level={4} type="danger" >
                                            Giá gốc: <span style={{color: '#fcb716'}}> {selectedRoom?.originPrice?.toLocaleString()} VND</span>
                                        </Title>
                                    </Col>
                                    <Col span={24}>
                                        <Title level={4} type="danger">
                                            Giá hiện tại: <span style={{color: '#fcb716'}}>{selectedRoom?.price?.toLocaleString()} VND</span>
                                        </Title>
                                    </Col>
                                </Row>
                            </Space>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </div>
    )
}

export default HotelRooms