
import React, { useState, useEffect } from "react";
import { Drawer, Button, Row, Col, Typography, Space, Tag, DatePicker, Table, Statistic, Select, Empty, Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";

import * as managementService from '~/apiServices/managementServive'
import './UserBookingHistory.css'
import { Option } from "antd/es/mentions";
const { Title, Text } = Typography;

const UserBookingHistory = ({userData}) => {
    const [open, setOpen] = useState(false)
    const [bookingData, setBookingData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [status, setStatus] = useState("Tất cả")
    
    useEffect(() => {
        const filtered = bookingData.filter((booking) =>
            (status ==='Tất cả' || booking.status === status )
        )
        setFilteredData(filtered)
        
    }, [status, bookingData])
    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.bookedList()
            const userBooked = res?.bookings?.filter(booking => booking.userId === userData?._id)
            setFilteredData(userBooked)
            setBookingData(userBooked)
        }
        fetchApi()
    }, [userData])
    const calculateStatistics = (data) => {
        const depositBookings = data.filter((booking) => booking.status === "Đã đặt cọc")
        const fullPaymentBookings = data.filter((booking) => booking.status === "Đã thanh toán")
        const cancelledBookings = data.filter((booking) => booking.status === "Hủy đặt")
        return {
            depositBookings,
            fullPaymentBookings,
            cancelledBookings,
        }
    }
    const {depositBookings, fullPaymentBookings, cancelledBookings } = calculateStatistics(filteredData)
    const handleStatusChange = (value) => {
        setStatus(value)
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
        title: "Chi tiết đơn đặt",
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
            <Title level={3}>Lịch sử đặt phòng của bạn</Title>

            <Row style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
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
                    <Statistic className="revenue-statistic" title="Số lượng đơn đặt phòng" value={filteredData?.length} />
                </Col>
                
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

export default UserBookingHistory;





