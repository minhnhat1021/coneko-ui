import Button from '~/components/Button'

function UserMenuItem({data, onClick}) {
    return ( 
        <Button itemUserBtn leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default UserMenuItem;