import React, { useState, useEffect } from "react";
import { Drawer, Button, Row, Col, Typography, Space, Tag, DatePicker, Table, Statistic, Select, Empty, Card } from "antd";
import { CheckOutlined, EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import moment from "moment";

import * as managementService from '~/apiServices/managementServive'
import './BookingManagement.css'
import { Option } from "antd/es/mentions";
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const RevenueDashboard = () => {
    const [open, setOpen] = useState(false)
    const [bookingData, setBookingData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [status, setStatus] = useState("Tất cả")
    const [dates, setDates] = useState()
   
    
    useEffect(() => {
        if (dates) {
            const [checkInDate, checkOutDate] = dates
            const filtered = bookingData.filter((booking) =>
                checkInDate < new Date(booking?.checkInDate) && checkOutDate?.add(1, "day") > new Date(booking?.checkOutDate) 
                && (status ==='Tất cả' || booking.status === status )
            )
            setFilteredData(filtered)
        } else {
            const filtered = bookingData.filter((booking) => status ==='Tất cả' || booking.status === status)
            setFilteredData(filtered)
        }
    }, [status, dates, bookingData])
    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.bookedList()
            setFilteredData(res?.bookings)
            setBookingData(res?.bookings)
        }
        fetchApi()
    }, [])
    const calculateStatistics = (data) => {
        const totalRevenue = data?.reduce((sum, booking) => {
            return booking?.status === 'Đã đặt cọc' ? sum + booking?.amountSpent : 
            (booking?.status === 'Đã thanh toán' ? sum + booking?.totalPrice : sum) 
        }, 0)
        const estimatedRevenue = data?.reduce((sum, booking) => {
            return booking?.status === 'Hủy đặt' ? sum : sum + booking?.totalPrice
        }, 0)
        const uniqueCustomers = [...new Set(data?.map((booking) => booking.user.fullName))]
        const bookedRooms = [...new Set(data?.reduce((acc, booking) => 
            acc.concat(booking?.rooms?.map(room => room?.name)), []
        ))]
        const depositBookings = data.filter((booking) => booking.status === "Đã đặt cọc")
        const fullPaymentBookings = data.filter((booking) => booking.status === "Đã thanh toán")
        const cancelledBookings = data.filter((booking) => booking.status === "Hủy đặt")
        return {
            totalRevenue,
            estimatedRevenue,
            uniqueCustomers,
            bookedRooms,
            depositBookings,
            fullPaymentBookings,
            cancelledBookings,
        }
    }
    const {totalRevenue,estimatedRevenue, uniqueCustomers, bookedRooms,depositBookings, fullPaymentBookings, cancelledBookings } = calculateStatistics(filteredData)
    const handleStatusChange = (value) => {
        setStatus(value)
    }
    const handleDateRangeChange = (dates) => {
        setDates(dates)
    }
    const handleBookingClick = (booking) => {
        setSelectedBooking(booking)
        setOpen(true)
    }

    const columns = [
        {
        title: "Tên khách hàng",
        dataIndex: ["user", "userName"],
        key: "userName",
        },
        {
        title: "Phòng",
        dataIndex: "rooms",
        key: "rooms",
        render: (rooms) => rooms.map((room) => room.name).join(", "),
        },
        {
        title: "Ngày nhận phòng",
        dataIndex: "checkInDate",
        key: "checkInDate",
        render: (date) => moment(date).format("DD/MM/YYYY"),
        },
        {
        title: "Ngày trả phòng",
        dataIndex: "checkOutDate",
        key: "checkOutDate",
        render: (date) => moment(date).format("DD/MM/YYYY"),
        },
        {
        title: "Tổng giá trị",
        dataIndex: "totalPrice",
        key: "totalPrice",
        render: (price) => `${price.toLocaleString()} ₫`,
        },
        {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (status) => (
            <Tag color={status === "Đã thanh toán" ? "green" : status === "Đã đặt cọc" ? "volcano" : "red"}>
                {status}
            </Tag>
        ),
        },
        {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
            <Button type="link" onClick={() => handleBookingClick(record)}>
            Xem chi tiết
            </Button>
        ),
        },
    ]

    return (
        <div  className="revenue-dashboard" style={{backgroundColor: '#484848', borderRadius: '10px'}}>
            <Title level={3}>Thống kê doanh thu khách sạn</Title>

            <Row style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <Space>
                    <RangePicker style={{height: '50px'}} placeholder={['Ngày bắt đầu', 'Ngày kết thúc']} className="date-picker" onChange={handleDateRangeChange} format="DD/MM/YYYY" />
                </Space>
                <Space style={{ padding: "0 20px" }}>
                    <label htmlFor="booking-status" style={{ marginRight: 10, color: '#fff' }}>Chọn trạng thái booking:</label>
                    <Select 
                        id="booking-status" 
                        value={status} 
                        onChange={handleStatusChange} 
                        style={{ width: 200, color: '#fff' }}
                        placeholder="Chọn trạng thái"
                    >
                        <Option value="Tất cả">Tất cả</Option>
                        <Option value="Đã đặt cọc">Đã đặt cọc</Option>
                        <Option value="Đã thanh toán">Đã thanh toán</Option>
                        <Option value="Hủy đặt">Hủy đặt</Option>
                    </Select>
                </Space>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                <Col span={6}>
                    <Statistic
                        title="Tổng doanh thu"
                        value={totalRevenue ? totalRevenue : 0}
                        prefix="₫"
                        valueStyle={{ color: "#3f8600" }}
                    />
                </Col>
                {status === 'Tất cả' && 
                <Col span={6}>
                    <Statistic
                    title="Doanh thu ước tính"
                    value={estimatedRevenue}
                    prefix="₫"
                    valueStyle={{ color: "#722ed1" }}
                    />
                </Col>}
                <Col span={6}>
                    <Statistic className="revenue-statistic" title="Số lượng đơn đặt phòng" value={filteredData?.length} />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="Tổng số khách hàng"
                        value={uniqueCustomers.length}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: "#1890ff" }}
                    />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="Tổng số phòng được đặt"
                        value={bookedRooms?.length}
                        valueStyle={{ color: "#faad14" }}
                    />
                </Col>
                {status === 'Tất cả' && 
                <>
                    <Col span={6}>
                        <Statistic
                            title="Đơn đặt phòng đã đặt cọc"
                            value={depositBookings?.length}
                            valueStyle={{ color: "#e07f4a" }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Đơn đặt phòng đã thanh toán"
                            value={fullPaymentBookings?.length}
                            valueStyle={{ color: "#3f8600" }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title="Đơn đặt phòng bị hủy"
                            value={cancelledBookings?.length}
                            valueStyle={{ color: "#ff4d4f" }}
                        />
                    </Col>
                </>
                }
            </Row>

            <Table
                className="booking-table"
                dataSource={filteredData}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                locale={{ emptyText: <Empty  description="Không có đơn đặt phòng nào" /> }}
            />

            <Drawer
                className="booking-drawer"
                title={`Chi tiết đặt phòng của ${selectedBooking?.user?.userName}`}
                onClose={() => setOpen(false)}
                open={open}
                width={1400}
            >
            {selectedBooking && (
            <div style={{ padding: "20px" }}>
                <Row gutter={[20, 20]}>
                    <Col span={12}>
                        <Title level={5}>Phòng</Title>
                        <Text>
                        {selectedBooking?.rooms?.map((room, index) =>
                            index < selectedBooking.rooms.length - 1 ? `${room.name}, ` : room.name
                        )}
                        </Text>
                    </Col>
                    <Col
                        span={24}
                        style={{ marginTop: "20px", padding: "20px", border: "1px solid #e7e7e7", borderRadius: "8px" }}
                    >
                    <Row>
                        <Col span={6}>
                            <Title level={5}>Ngày nhận phòng</Title>
                            <Text>{moment(selectedBooking.checkInDate).format("DD/MM/YYYY")}</Text>
                        </Col>
                        <Col span={6}>
                            <Title level={5}>Ngày trả phòng</Title>
                            <Text>{moment(selectedBooking.checkOutDate).format("DD/MM/YYYY")}</Text>
                        </Col>
                        <Col span={6}>
                            <Title level={5}>Số ngày ở</Title>
                            <Text>{selectedBooking.days}</Text>
                        </Col>
                        <Col span={6}>
                            <Title level={5}>Ngày đặt</Title>
                            <Text>{moment(selectedBooking.bookingDate).format("DD/MM/YYYY")}</Text>
                        </Col>
                    </Row>
                </Col>
                    <Col
                        span={24}
                        style={{ marginTop: "20px", padding: "20px", border: "1px solid #e7e7e7", borderRadius: "8px" }}
                    >
                        <Row>
                            <Col span={6}>
                                <Title level={5}>Giá gốc</Title>
                                <Text>{`${selectedBooking.roomCharge.toLocaleString()} ₫`}</Text>
                            </Col>
                            <Col span={6}>
                                <Title level={5}>Giảm giá</Title>
                                <Text>{`${selectedBooking.discountRate}%`}</Text>
                            </Col>
                            <Col span={6}>
                                <Title level={5}>Giá sau giảm</Title>
                                <Text>{`${selectedBooking.totalPrice.toLocaleString()} ₫`}</Text>
                            </Col>
                            <Col span={6}>
                                <Title level={5}>Tiền đặt cọc</Title>
                                <Text>{`${selectedBooking.amountSpent.toLocaleString()} ₫`}</Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        span={24}
                        style={{ marginTop: "20px", padding: "20px", border: "1px solid #e7e7e7", borderRadius: "8px" }}
                    >
                        <Row style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Col span={6}>
                                <Title level={5}>Trạng thái</Title>
                                <Tag
                                color={
                                    selectedBooking.status === "Đã thanh toán"
                                    ? "green"
                                    : selectedBooking.status === "Đã đặt cọc"
                                    ? "volcano"
                                    : "red"
                                }
                                >
                                {selectedBooking.status}
                                </Tag>
                            </Col>
                            <Col span={6}>
                                <Title level={5} style={{ color: "red" }}>Tiền chưa thanh toán</Title>
                                <Text style={{ color: "red" }}>{`${selectedBooking.outstandingBalance.toLocaleString()} ₫`}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            )}
        </Drawer>
        </div>
    );
};

export default RevenueDashboard;


// import React, { useEffect, useState } from 'react'

// import { Link, useNavigate } from 'react-router-dom'

// import * as managementService from '~/apiServices/managementServive'
// import Button from '~/components/Button'

// import classNames from 'classnames/bind'
// import styles from './BookingManagement.module.scss'

// const cx = classNames.bind(styles)

// function BookingManagement({ adminData }) {
//     const [bookings, setBookings] = useState([])

//     useEffect( () => {
//         const fetchApi = async () => {
//             try {
//                 const res = await managementService.bookingManagement()
//                 setBookings(res.bookings)
//             } catch (error) {
//                 console.error('gọi api lỗi', error)
//             }
//         }
//         fetchApi()
//     }, [])


//     // Chuyển đổi định dạng ngày
//     const formattedDay = (date) => {
//         return  date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()  
//     }
//     const formattedTime = (date) => {
//         const hours = date.getHours().toString().padStart(2, '0')
//         const minutes = date.getMinutes().toString().padStart(2, '0')
//         const seconds = date.getSeconds().toString().padStart(2, '0')
        
//         return `${hours}:${minutes}:${seconds}`
//     }
//     const navigate = useNavigate()

//     const handleBookingsDetails = (booking, id) => {
//         navigate(`details/${id}`, {
//             state: { booking }
//         })
//     }

//     // options -------------------------------------------
//     const [options, setOptions] = useState({
//         silver: false,
//         gold: false,
//         platinum: false,
//         diamond: false,
//         vip: false,
//     })

//     useEffect(() => {
//         var optionInputs = document.querySelectorAll('[name][options]')
//         for(var optionInput of optionInputs) {
//             optionInput.onchange = function () {
//                 var name = this.getAttribute('name')
//                 var isChecked = this.checked

//                 setOptions(prev => ({
//                     ...prev,
//                     [name]: isChecked 
//                 }))
//             }
//         }
//     }, [])

//     useEffect(() => {
//         const handleFilter = async() => {
//             const filters = Object.keys(options).filter(
//               (key) => options[key] === true
//             )
    
//             const res = await managementService.filterBookingByOptions(filters)
//             setBookings(res?.bookings)
    
//         }
//         handleFilter()
//     },[options])


//     // Checkbox-all actions
//     const [action, setAction] = useState()
//     const [statusAction, setStatusAction] = useState(false)
//     const [disabledActions, setDisabledActions] = useState(true)

//     useEffect(() => {
//         var checkboxAll = document.getElementById('checkbox__all')
//         var bookingCheckbox = document.querySelectorAll("input[name='bookingIds[]']")

//         checkboxAll.onchange = (e) => {
//             const isCheckAll = e.target.checked
            
//             bookingCheckbox.forEach((checkbox) => {
                
//                 checkbox.checked = isCheckAll
//                 const countCheckboxChecked = document.querySelectorAll("input[name='bookingIds[]']:checked").length

//                 if(countCheckboxChecked > 0 ){
//                     setDisabledActions(false)
//                 } else{
//                     setDisabledActions(true)
//                 }
//             })
            
//         }
        
//         bookingCheckbox.forEach((checkbox) => {
//             checkbox.onchange = () => {
//                 const countCheckboxChecked = document.querySelectorAll("input[name='bookingIds[]']:checked").length
//                 const isCheckAll = bookingCheckbox.length === countCheckboxChecked
//                 checkboxAll.checked = isCheckAll

//                 if(countCheckboxChecked > 0 ){
//                     setDisabledActions(false)
//                 } else{
//                     setDisabledActions(true)
//                 }
//             }
//         }) 
        
//     },[bookings])

//     const handleActions = async() => {
//         var checkboxChecked = Array.from(document.querySelectorAll("input[name='bookingIds[]']:checked"))
//         const bookingIds = checkboxChecked.map(checkbox => checkbox.id)

//         if(!action) {
//             setStatusAction(true)
//         } else {
//             setStatusAction(false)
//             const res = await managementService.bookingActions(action, bookingIds)

//             if(res?.msg){
//                 window.location.href='/admin/booking-management'
//             }
//         }
//     }
//     return ( 
//         <div className={cx('wrapper')}>
//             <div className={cx('container')}>
//                 <div className={cx('header')}>
//                     <h2 className={cx('title')}>Lịch sử giao dịch của khách hàng</h2>
//                     <Link to='/admin/booking-trash'>Thùng rác</Link>
//                 </div>
//                 <div className={cx('options')}>
//                     <div className={cx('option__item')}>
//                         <input id='silver' name='silver' options='' type="checkbox" className={cx('options__checkbox')}/>
//                         <label htmlFor='silver' className={cx('options__label')}></label>
//                         <p>Dưới 20tr</p>
//                     </div>
//                     <div className={cx('option__item')}>
//                         <input id='gold' name='gold' options='' type="checkbox" className={cx('options__checkbox')}/>
//                         <label htmlFor='gold' className={cx('options__label')}></label>
//                         <p>20tr - 50tr</p>
//                     </div>
//                     <div className={cx('option__item')}>
//                         <input id='platinum' name='platinum' options='' type="checkbox" className={cx('options__checkbox')}/>
//                         <label htmlFor='platinum' className={cx('options__label')}></label>
//                         <p>50tr - 70tr</p>
//                     </div>
                    
//                     <div className={cx('option__item')}>
//                         <input id='diamond' name='diamond' options='' type="checkbox" className={cx('options__checkbox')}/>
//                         <label htmlFor='diamond' className={cx('options__label')}></label>
//                         <p>70tr - 100 tr</p>
//                     </div>
//                     <div className={cx('option__item')}>
//                         <input id='vip' name='vip' options='' type="checkbox" className={cx('options__checkbox')}/>
//                         <label htmlFor='vip' className={cx('options__label')}></label>
//                         <p>Trên 100tr</p>
//                     </div>
                    
//                 </div>
//                 <div id="actions" className={cx('actions')}>
//                     <div className={cx('checkbox')}>
//                         <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
//                         <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
//                     </div>
//                     <select  name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
//                         <option value='' >-- Chọn hành động --</option>
//                         <option value="forceDelete">Xóa</option>
//                     </select>
//                     <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
//                     {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
//                 </div>
//                 <div className={cx('bookings')}>
//                     <div className={cx('bookings__header')}>
//                         <div>Thời gian thanh toán</div>
//                         <div>Ngày nhận phòng</div>
//                         <div>Ngày trả phòng</div>
//                         <div>Số tiền</div>
//                         <div>Hành động</div>
//                     </div>
//                     {bookings?.map((booking, index) => (
//                         <div className={cx('wrap__bookings-body')}>
//                             <div className={cx('bookings__body')} key={index} onClick={() => handleBookingsDetails(booking, booking._id)}>
//                                 <div className={cx('bookings__body-item')}> 
//                                     <div>{bookings ? formattedDay(new Date(booking.bookingDate)) : ''}</div> 
//                                     <div>{bookings ? formattedTime(new Date(booking.bookingDate)) : ''}</div>
//                                 </div>
//                                 <div className={cx('bookings__body-item')}>
//                                     <div>{bookings ? formattedDay(new Date(booking.checkInDate)) : ''}</div>
//                                     <div>{bookings ? formattedTime(new Date(booking.checkInDate)) : ''}</div>
//                                 </div>
//                                 <div className={cx('bookings__body-item')}>
//                                     <div>{bookings ? formattedDay(new Date(booking.checkOutDate)) : ''}</div>
//                                     <div>{bookings ? formattedTime(new Date(booking.checkOutDate)) : ''}</div>
//                                 </div>
//                                 <div className={cx('bookings__body-item')}>{booking?.amountSpent?.toLocaleString('vi-VN')}</div>
    
                                
//                             </div>
//                             <div className={cx('checkbox', 'checkbox__body')}>
//                                 <input id={booking._id} vaule={booking._id} name='bookingIds[]' type="checkbox" className={cx('actions__checkbox')}/>
//                                 <label htmlFor={booking._id} className={cx('actions__label')}> </label>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BookingManagement

