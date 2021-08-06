import {signOut} from '../Services/Utils'
import Navbar from "../Components/Navigation/index"
const Home = () =>{
    return(
        <div>
            <Navbar />
            <button onClick={signOut}>Logout</button>
        </div>
    );
}

export default Home;
