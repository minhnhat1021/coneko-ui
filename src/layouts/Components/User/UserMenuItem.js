import Button from '~/components/Button'

function UserMenuItem({data, logout, onClick}) {

    return ( 
        <Button  itemUserBtn leftIcon={data.icon} to={data.to} onClick={onClick} logout={logout}>
            {data.title}
        </Button>
    );
}

export default UserMenuItem;