import { React, useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProject, updateProject, sortProjectsAZ, sortProjectsZA, sortProjectsNew, sortProjectsOld, sortProjectsTasksInc, sortProjectsTasksDec } from '../../features/projectsSlice';
import { removeUser } from '../../features/userSlice';
import useAuth from '../../hooks/useAuth';

import './projectList.scss';

import deleteIcon from '../../resources/icons/delete-icon.svg';
import editIcon from '../../resources/icons/edit-icon.svg';
import addIcon from '../../resources/icons/add-icon.png';
import completeIcon from '../../resources/icons/complete-icon.svg';

const ProjectList = memo(() => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects); // Проекты из состояния
    const { email } = useAuth()

    const [editingProjectId, setEditingProjectId] = useState(null);
    const [newProjectName, setNewProjectName] = useState('');

    // Функция для начала редактирования
    const handleEditClick = (project) => {
        setEditingProjectId(project.id); // Устанавливаем проект, который мы редактируем
        setNewProjectName(project.name); // Инициализируем имя проекта для редактирования
    };

    // Функция для сохранения изменений
    const handleSaveClick = (projectId) => {
        if (!newProjectName.trim()) {
            alert("Project name is required!");
            return;
        }

        const updatedProject = {
            id: projectId,
            name: newProjectName
        };

        dispatch(updateProject(updatedProject)); // Обновляем проект в Redux
        setEditingProjectId(null); // Завершаем редактирование
        setNewProjectName(''); // Сбрасываем временное имя
    };

    // Функция для отмены редактирования
    const handleCancelClick = () => {
        setEditingProjectId(null);
        setNewProjectName('');
    };

    const handleRemoveProject = (projectId) => {
        dispatch(removeProject(projectId)); // Удаление проекта
    };

    const handleSortAZ = () => {
        dispatch(sortProjectsAZ());
    };

    const handleSortZA = () => {
        dispatch(sortProjectsZA());
    };

    const handleSortNew = () => {
        dispatch(sortProjectsNew())
    };

    const handleSortOld = () => {
        dispatch(sortProjectsOld())
    };

    const handleSortProjectsTasksInc = () => {
        dispatch(sortProjectsTasksInc())
    };

    const handleSortProjectsTasksDec = () => {
        dispatch(sortProjectsTasksDec())
    };




    useEffect(() => {
        console.log('effect')
    })

    return (

        <div>
            <div className="projectList__exit">
                <span><Link to='/'>[{email}]</Link></span>
                <button
                    className='projectList__exit-button'
                    onClick={() => {
                        localStorage.clear();
                        dispatch(removeUser());
                    }}
                >
                    Выйти из аккаунта
                </button>
            </div>
            <div className="projectList__sorting">
                <span className="projectList__sorting-title">Сортировка:</span>
                <div className="projectList__sorting_name">
                    <div onClick={handleSortAZ} >По названию: А-Я</div>
                    <div onClick={handleSortZA} >По названию: Я-А</div>
                </div>
                <div className="projectList__sorting_time">
                    <div onClick={handleSortNew} >Сначала новые</div>
                    <div onClick={handleSortOld} >Сначала старые</div>
                </div>
                <div className="projectList__sorting_task">
                    <div onClick={handleSortProjectsTasksInc} >Кол-во выполненных задач (по возрастанию)</div>
                    <div onClick={handleSortProjectsTasksDec} >Кол-во выполненных задач (по убыванию)</div>
                </div>
            </div>

            <h2 className='projectList__title'>Ваши проекты</h2>

            {projects.length > 0 ? (
                <ul className='projectList__ul'>
                    {projects.map((project) => (
                        <li className='projectList__li' key={project.id}>
                            {editingProjectId === project.id ? (
                                <div className='projectList__edit-item'>
                                    <input
                                        className='projectList__input'
                                        type="text"
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                        placeholder="Enter new project name">
                                    </input>
                                    <div><img src={completeIcon} alt='complete-name' onClick={() => handleSaveClick(project.id)} /></div>
                                    <div><img src={deleteIcon} alt='cancel-name' onClick={handleCancelClick} /></div>
                                </div>
                            ) : (
                                <div className='projectList__item'>
                                    <Link className='projectList__name' to={`/projects/${project.id}`}><span >{project.name}</span></Link>
                                    <div className='projectList__icons'>
                                        <div><img src={editIcon} alt='edit-name' onClick={() => handleEditClick(project)} /></div>
                                        <div><img src={deleteIcon} alt='delete-project' onClick={() => handleRemoveProject(project.id)} /></div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Пока что проектов нет...</p>
            )}
            <div className='projectList__icons_add'><Link to="/projects/new" ><img src={addIcon} alt="add-project" /></Link></div>





        </div>
    );
});

export default ProjectList;
