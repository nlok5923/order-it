import {signOut} from '../Services/Utils'
const Home = () =>{
    return(
        <div>
            <button onClick={signOut}>Logout</button>
        </div>
    );
}

export default Home;