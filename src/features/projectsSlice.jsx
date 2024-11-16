import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        id: 1,
        name: 'Проект 1',
        tasks: []
    }
];

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            return action.payload;
        },
        addProject: (state, action) => {
            state.push(action.payload);
        },
        removeProject: (state, action) => {
            return state.filter(project => project.id !== action.payload);
        },
        updateProject: (state, action) => {
            const project = state.find(p => p.id === action.payload.id);
            if (project) {
                project.name = action.payload.name; // Обновляем проект
            }
        },
        sortProjectsAZ: (state) => {
            state.sort((a, b) => a.name.localeCompare(b.name));
        },
        sortProjectsZA: (state) => {
            state.sort((a, b) => b.name.localeCompare(a.name));
        },
        sortProjectsNew: (state) => {
            state.sort((a, b) => a.id - b.id)
        },
        sortProjectsOld: (state) => {
            state.sort((a, b) => b.id - a.id)
        },
        sortProjectsTasksInc: (state) => {
            state.sort((a, b) => a.tasks.filter(task => (task.completed)).length - b.tasks.filter(task => (task.completed)).length);
        },
        sortProjectsTasksDec: (state) => {
            state.sort((a, b) => b.tasks.filter(task => (task.completed)).length - a.tasks.filter(task => (task.completed)).length);
        },
        addTask: (state, action) => {
            const project = state.find(p => p.id === action.payload.projectId);
            if (project) {
                project.tasks.push(action.payload.task); // Добавляем задачу в проект
            }
        },
        removeTask: (state, action) => {
            const project = state.find(p => p.id === action.payload.projectId);
            if (project) {
                project.tasks = project.tasks.filter(task => task.id !== action.payload.taskId); // Удаляем задачу из проекта
            }
        },
        updateTask: (state, action) => {
            const project = state.find(p => p.id === action.payload.projectId);
            if (project) {
                const taskIndex = project.tasks.findIndex(task => task.id === action.payload.task.id);
                if (taskIndex !== -1) {
                    project.tasks[taskIndex] = action.payload.task; // Обновляем задачу
                }
            }
        },
        toggleTaskCompletion: (state, action) => {
            const project = state.find(p => p.id === action.payload.projectId);
            if (project) {
                const task = project.tasks.find(t => t.id === action.payload.taskId);
                if (task) {
                    task.completed = !task.completed; // Переключаем состояние завершенности задачи
                }
            }
        },
    },
});

export const { setProjects,
    addProject,
    removeProject,
    updateProject,
    sortProjectsAZ,
    sortProjectsZA,
    sortProjectsNew,
    sortProjectsOld,
    sortProjectsTasksInc,
    sortProjectsTasksDec,
    addTask,
    removeTask,
    updateTask,
    toggleTaskCompletion } = projectsSlice.actions;
export default projectsSlice.reducer;
