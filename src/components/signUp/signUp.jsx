import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from '../../features/userSlice';
import SignForm from "../signForm/SignForm";

import './signUp.scss';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleSignUp = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
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
                alert('Введены неверные данные или пользователь с таким именем уже существует')
            });
    }

    return (
        <div className="signUp">
            <h1>Регистрация</h1>
            <SignForm
                title='Зарегистрироваться'
                handleClick={handleSignUp}
            />
            <div>Или <Link to='/signin'>авторизируйтесь</Link>, если у Вас уже есть аккаунт</div>
        </div>
    )
}

export default SignUp