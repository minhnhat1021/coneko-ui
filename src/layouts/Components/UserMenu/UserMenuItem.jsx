import Button from '~/components/Button'

function UserMenuItem({data, account, currentRooms, bookingHistory, favoriteRooms,  payCard, logout, onClick}) {

    return ( 
        <Button  
            itemUserBtn 
            leftIcon={data.icon} 
            to={data.to} 
            onClick={onClick} 
            logout={logout} 
            account={account}
            currentRooms={currentRooms}
            bookingHistory={bookingHistory}
            favoriteRooms={favoriteRooms}
            payCard={payCard}
        >
            {data.title}
        </Button>
    )
}

export default UserMenuItem