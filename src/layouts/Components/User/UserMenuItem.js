import Button from '~/components/Button'

function UserMenuItem({data, account, transactionList, bookingHistory, logout, onClick}) {

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
        >
            {data.title}
        </Button>
    );
}

export default UserMenuItem;