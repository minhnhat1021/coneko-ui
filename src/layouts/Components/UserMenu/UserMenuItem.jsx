import Button from '~/components/Button'

function UserMenuItem({data, account, transactionList, bookingHistory, payCard, logout, onClick}) {

    return ( 
        <Button  
            itemUserBtn 
            leftIcon={data.icon} 
            to={data.to} 
            onClick={onClick} 
            logout={logout} 
            account={account}
            transactionList={transactionList}
            bookingHistory={bookingHistory}
            payCard={payCard}
        >
            {data.title}
        </Button>
    )
}

export default UserMenuItem