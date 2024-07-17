function About({ userData = {data: {message: ''}}}) {
    return ( 
        <div>
            <h2>About Page</h2>
            <p>{userData.data.message}</p>
        </div>
    );
}

export default About;