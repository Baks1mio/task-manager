import { Link } from 'react-router-dom';
import taskmanager from '../../resources/img/taskmanager.png';
import './appHeader.scss';

const AppHeader = () => {
    return (

        <Link className="appHeader" to='/'>
            <img src={taskmanager} className='appHeader__logo' alt='logo'></img>
            <div className="appHeader__title">Task Manager</div>
        </Link>

    )
}

export default AppHeader;