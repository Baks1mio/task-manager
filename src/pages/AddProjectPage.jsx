import AddProject from '../components/addProject/AddProject';
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


const AddProjectPage = () => {

    const { isAuth } = useAuth();

    return (
        isAuth ? <AddProject /> : <Navigate to='/signin' />
    )
}

export default AddProjectPage;