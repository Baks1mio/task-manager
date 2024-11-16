import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, removeTask, updateTask, toggleTaskCompletion } from '../../features/projectsSlice';

import addTaskIcon from '../../resources/icons/addTask-icon.svg'
import deleteIcon from '../../resources/icons/delete-icon.svg'
import editIcon from '../../resources/icons/edit-icon.svg'
import completeIcon from '../../resources/icons/complete-icon.svg';

import './projectDetail.scss';

const ProjectDetail = () => {
    const { projectId } = useParams(); // Получаем ID проекта из URL
    const dispatch = useDispatch();

    // Ищем проект в store по projectId
    const project = useSelector(state => state.projects.find(p => p.id === parseInt(projectId)));

    // Если проект найден, инициализируем массив задач или пустой массив, если нет задач
    const tasks = project ? project.tasks : [];

    const [newTaskName, setNewTaskName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskName, setEditingTaskName] = useState('');

    if (!project) {
        return <div>Project not found!</div>;
    }

    // Обработчик добавления новой задачи
    const handleAddTask = () => {
        if (!newTaskName.trim()) {
            alert('Некорректное имя задачи');
            return;
        }

        // Создаем новую задачу
        const newTask = {
            id: Date.now(), // Используем текущий timestamp как уникальный ID
            name: newTaskName,
            completed: false,
        };

        // Добавляем задачу в Redux store
        dispatch(addTask({ projectId: project.id, task: newTask }));
        setNewTaskName(''); // Очищаем поле ввода
    };

    // Обработчик редактирования задачи
    const handleEditTask = (task) => {
        setEditingTaskId(task.id); // Устанавливаем ID редактируемой задачи
        setEditingTaskName(task.name); // Устанавливаем текущее имя задачи для редактирования
    };

    // Обработчик сохранения изменений задачи
    const handleSaveTask = () => {
        if (!editingTaskName.trim()) {
            alert('Некорректное имя задачи');
            return;
        }

        const updatedTask = {
            id: editingTaskId,
            name: editingTaskName,
            completed: project.tasks.find(t => t.id === editingTaskId)?.completed || false, // сохраняем статус выполненности
        };

        dispatch(updateTask({ projectId: project.id, task: updatedTask }));
        setEditingTaskId(null); // Завершаем редактирование
        setEditingTaskName(''); // Сбрасываем значение имени задачи
    };

    // Обработчик отмены редактирования задачи
    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditingTaskName('');
    };

    // Обработчик удаления задачи
    const handleRemoveTask = (taskId) => {
        dispatch(removeTask({ projectId: project.id, taskId }));
    };

    // Обработчик отметки выполнения задачи и подсчета выполненных задач
    const handleToggleTaskCompletion = (taskId) => {
        dispatch(toggleTaskCompletion({ projectId: project.id, taskId }));
        const completedTasks = project.tasks.filter((task) => {
            return task.completed
        })
        return completedTasks.length
    };




    return (
        <div className='projectDetail'>
            <h2 className='projectDetail__title'>Задачи проекта "{project.name}"</h2>
            <Link className='projectDetail__back' to="/projects">Вернуться к списку проектов</Link>

            <div className='projectDetail__add-form'>
                <h3 className='projectDetail__subtitle'>Добавить задачу</h3>
                <div className='projectDetail__add-task'>
                    <input
                        className='projectDetail__input'
                        type="text"
                        value={newTaskName}
                        onChange={(e) => setNewTaskName(e.target.value)}
                        placeholder="Имя задачи"
                    />
                    <div className='projectDetail__add-task-icon' onClick={handleAddTask}><img src={addTaskIcon} alt="add-task" /></div>
                </div>
            </div>

            <h3 className='projectDetail__subtitle'>Задачи</h3>
            {tasks.length > 0 ? (
                <ul>
                    {tasks.map((task) => (
                        <li style={{ 'listStyleType': 'none' }} key={task.id}>
                            {editingTaskId === task.id ? (
                                // Если задача редактируется, показываем поле ввода
                                <div className='projectDetail__task-item'>
                                    <input
                                        className='projectDetail__input'
                                        type="text"
                                        value={editingTaskName}
                                        onChange={(e) => setEditingTaskName(e.target.value)}
                                        placeholder="Edit task name"
                                    />
                                    <div onClick={handleSaveTask}><img src={completeIcon} alt='complete-name' /></div>
                                    <div onClick={handleCancelEdit}><img src={deleteIcon} alt='cancel-name' /></div>
                                </div>
                            ) : (
                                // Если задача не редактируется, отображаем обычный текст
                                <div className='projectDetail__task-item'>
                                    <span className='projectDetail__task-name' style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                        {task.name}
                                    </span>
                                    <div onClick={() => handleToggleTaskCompletion(task.id)}><img src={completeIcon} alt='complete-task' /></div>
                                    <div onClick={() => handleEditTask(task)}><img src={editIcon} alt='edit-task' /></div>
                                    <div onClick={() => handleRemoveTask(task.id)}><img src={deleteIcon} alt='delete-task' /></div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Пока что задач нет...</p>
            )}
            <div className="projectDetail__task-bar">
                <span>Выполнено задач: {handleToggleTaskCompletion()} из {project.tasks.length}</span>
                <div className="projectDetail__task-bar_passive">
                    <div className="projectDetail__task-bar_active" style={{ 'width': `${handleToggleTaskCompletion() / project.tasks.length * 100}%` }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
