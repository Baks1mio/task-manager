import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../features/projectsSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './addProject.scss';
import completeIcon from '../../resources/icons/complete-icon.svg';

const AddProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Состояние для формы добавления проекта
    const [projectName, setProjectName] = useState('');

    // Функция для обработки отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка на пустое имя проекта
        if (!projectName.trim()) {
            alert("Некорректное имя проекта");
            return;
        }

        // Генерация уникального ID для нового проекта
        const newProject = {
            id: Date.now(), // Используем временную метку как ID
            name: projectName,
            tasks: []
        };

        // Добавление проекта в состояние через Redux
        dispatch(addProject(newProject));

        // Перенаправление на страницу со списком проектов
        navigate('/projects');
    };

    return (
        <div>
            <h2 className='addProject__title'>Создать новый проект</h2>
            <Link className='addProject__back' to="/projects">Вернуться к списку проектов</Link>
            <form>
                <div className='addProject__form'>
                    <input
                        className='addProject__input'
                        id="projectName"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Введите имя проекта"
                    />
                    <div><img src={completeIcon} alt='cancel-name' onClick={handleSubmit} /></div>
                </div>


            </form>
        </div>
    );
};

export default AddProject;
