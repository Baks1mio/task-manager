import ProjectList from '../components/ProjectList/ProjectList';
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


const ProjectsPage = () => {

    const { isAuth } = useAuth();

    return (
        isAuth ? <ProjectList /> : <Navigate to='/signin' />
    )
}

export default ProjectsPage;
