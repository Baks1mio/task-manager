import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../../features/userSlice';
import SignForm from "../signForm/SignForm";

import './signIn.scss';

const SignIn = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()



    const handleSignIn = (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                localStorage.setItem('email', user.email);
                localStorage.setItem('id', user.uid);
                localStorage.setItem('token', user.accessToken);
                dispatch(setUser({
                    email: localStorage.getItem('email'),
                    id: localStorage.getItem('id'),
                    token: localStorage.getItem('token')
                }))
                navigate('/');
            })
            .catch(() => {
                alert('Введены неверные данные')
            });
    }

    return (
        <div className="signIn">
            <h1>Авторизация</h1>
            <SignForm
                title='Войти'
                handleClick={handleSignIn}
            />
            <div>Или <Link to='/signup'>зарегистрируйтесь</Link>, если у Вас ещё нет аккаунта</div >
        </div >

    )
}

export default SignIn;