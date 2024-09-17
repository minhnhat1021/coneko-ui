function UserPurchase({ userData }) {
    const user = userData.data.data

    return ( 
        <h2>UserPurchase Page {user.email}</h2>
    )
}

export default UserPurchase