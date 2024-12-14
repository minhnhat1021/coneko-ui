
import React, {useState, useEffect} from 'react'
import { Row, Col, Table, Tag, Typography, Input, Drawer, Radio, Space, Button, Card, Divider, Empty,  } from "antd"
import moment from 'moment'
import * as managementService from '~/apiServices/managementServive'
import './BookedFullPayment.css'

const { Text, Title } = Typography;

function BookedFullPayment({ adminData }) {
    const [bookingData, setBookingData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchText, setSearchText] = useState('')
    
    const [open, setOpen] = useState(false)
    const [selectedBooking, setSelectedBooking] = useState(null)

    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.bookedList('Đã thanh toán')
            setFilteredData(res?.bookings)
            setBookingData(res?.bookings)
        }
        fetchApi()
    }, [])
    const handleSearch = async(e) => {
        const value = e.target.value
        if(!value) {
            setFilteredData(bookingData)
            setSearchText('')
            return
        }
        setSearchText(value)
        const filtered = bookingData?.filter((booking) =>
            booking.user?.userName === value || booking?.bookingId === value
        )
        setFilteredData(filtered)
    }
    // Xử lý mở modal
    const handleRowClick = (record) => {
        setSelectedBooking(record)
        setOpen(true)
    }

    const columns = [
        {
            title: "Người đặt",
            dataIndex: ["user", "userName"],
            key: "user",
            width: '15%',
        },
        
        {
            title: "Nhận phòng",
            dataIndex: "checkInDate",
            key: "checkInDate",
            render: (value) => moment(value).format('DD/MM/YYYY'),
            width: '10%'
        },
        {
            title: "Trả phòng",
            dataIndex: "checkOutDate",
            key: "checkOutDate",
            render: (value) => moment(value).format('DD/MM/YYYY'),
            width: '10%'
        },
        {
            title: "Số ngày ở",
            dataIndex: "days",
            key: "days",
            width: '8%'
        },
        {
            title: "Ngày đặt",
            dataIndex: "bookingDate",
            key: "bookingDate",
            render: (value) => moment(value).format('DD/MM/YYYY'),
            width: '10%'
        },
        
        {
            title: "Giá ưu đãi",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (value) => `${value?.toLocaleString()} ₫`,
            width: '10%'
        },
        {
            title: "Số tiền đã thanh toán",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (value) => (
                <Text strong className='successColor' style={{ color: "green" }}>
                {`${value?.toLocaleString()} ₫`}
                </Text>
            ),
            width: '10%',
            
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "geekblue"
                if (status === "Đã đặt cọc") color = "volcano"
                if (status === "Đã thanh toán") color = "green"
                if (status === "Đã hủy") color = "red"
                return <Tag color={color}>{status.toUpperCase()}</Tag>
            },
            width: '10%'
        },
        
    ];
    
    return ( 
        <Card style={{maxWidth: '1180px', overflow: 'hidden'}}
            title="Danh sách đơn đặt phòng đã đặt cọc"
            extra={<p style={{ margin: 0, color: '#666' }}>Tìm kiếm và quản lý đơn đặt phòng</p>}
        >
            
            <Space direction="horizontal" style={{ display: 'flex', }}>
                <Divider orientation="left">Tìm kiếm người đặt/id đơn đặt phòng</Divider>
                <Input
                    placeholder="Tìm kiếm người đặt/id đơn đặt phòng"
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: 300, height: 40 }}
                />
            </Space>
            <Table 
                dataSource={filteredData} 
                columns={columns} 
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                })}
                rowClassName="custom-row"
                scroll={{ x: 1500, y: 360 }}
                locale={{ emptyText: <Empty description="Không có đơn đặt phòng nào đẵ thanh toán vào thời điểm này" /> }}
            />
            <Drawer
                title={`Chi tiết đặt phòng của ${selectedBooking?.user?.userName}`}
                onClose={() => setOpen(false)}
                open={open}
                width={1400}  
                style={{ padding: '20px' }}
            >
                {selectedBooking &&
                <div style={{ padding: '20px' }}>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Title level={5}>Phòng</Title>
                            <Text>
                                {selectedBooking?.rooms?.length > 0 
                                    ? (selectedBooking?.rooms?.map((room, index) => {
                                        return index < selectedBooking?.rooms?.length - 1 ? `${room?.name}, ` : room?.name
                                    })) 
                                    : ''
                                }
                            </Text>
                        </Col>
                
                        <Col span={24} style={{marginTop: '20px', padding: '20px', border: '1px solid #e7e7e7' ,borderRadius: '8px'}}>
                            <Row>
                                <Col span={6}>
                                    <Title level={5}>Ngày nhận phòng</Title>
                                    <Text>{moment(selectedBooking?.checkInDate).format('DD/MM/YYYY')}</Text>
                                </Col>
                        
                                <Col span={6}>
                                    <Title level={5}>Ngày trả phòng</Title>
                                    <Text>{moment(selectedBooking?.checkOutDate).format('DD/MM/YYYY')}</Text>
                                </Col>
                        
                                <Col span={6}>
                                    <Title level={5}>Số ngày ở</Title>
                                    <Text>{selectedBooking?.days}</Text>
                                </Col>
                        
                                <Col span={6}>
                                    <Title level={5}>Ngày đặt</Title>
                                    <Text>{moment(selectedBooking?.bookingDate).format('DD/MM/YYYY')}</Text>
                                </Col>
                            </Row>
                        </Col>
                    
                       <Col span={24} style={{marginTop: '20px', padding: '20px', border: '1px solid #e7e7e7' ,borderRadius: '8px'}}>
                            <Row>
                                <Col span={6}>
                                    <Title level={5}>Giá gốc</Title>
                                    <Text>{`${selectedBooking?.roomCharge.toLocaleString()} ₫`}</Text>
                                </Col>
                            
                                <Col span={6}>
                                    <Title level={5}>Giảm giá</Title>
                                    <Text>{`${selectedBooking?.discountRate}%`}</Text>
                                </Col>
                        
                                <Col span={6}>
                                    <Title level={5}>Giá sau giảm</Title>
                                    <Text>{`${(selectedBooking?.totalPrice).toLocaleString()} ₫`}</Text>
                                </Col>
                            
                                <Col span={6}>
                                    <Title level={5}>Tiền đặt cọc</Title>
                                    <Text>{`${selectedBooking?.amountSpent.toLocaleString()} ₫`}</Text>
                                </Col>
                            </Row>
                       </Col>
                    
                        <Col span={24} style={{marginTop: '20px', padding: '20px', border: '1px solid #e7e7e7' ,borderRadius: '8px'}} >
                            <Row style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Col span={6}>
                                    <Title level={5}>Trạng thái</Title>
                                    <Tag color={selectedBooking?.status === "Đã thanh toán" ? "green" : selectedBooking?.status === "Đã đặt cọc" ? "volcano" : "red"}>
                                    {selectedBooking?.status}
                                    </Tag>
                                </Col>
                                <Col span={6}>
                                    <Title level={5} className='successColor' style={{ color: 'green' }}>Số tiền đã thanh toán</Title>
                                    <Text className='successColor' style={{ color: 'green' }}>
                                        {`${selectedBooking?.totalPrice.toLocaleString()} ₫`}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                }
            </Drawer>
        </Card>
    )
}

export default BookedFullPayment

