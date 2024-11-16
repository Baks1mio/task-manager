import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { removeUser } from '../features/userSlice';


import '../components/signForm/homePage.scss';


const HomePage = () => {

    const { isAuth, email } = useAuth()
    const dispatch = useDispatch();

    return (
        isAuth ? (
            <div className="homePage">
                <h1>Здравствуйте, {email}!</h1>
                <button
                    onClick={() => {
                        localStorage.clear();
                        dispatch(removeUser());
                    }}
                >
                    Выйти из аккаунта
                </button>
                <Link to='/projects' className="homePage__toProjects">Перейти к проектам</Link>
            </div>
        ) :
            (
                <Navigate to='/signin' />
            )
    )

}

export default HomePage;