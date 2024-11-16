import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import Header from '../AppHeader/AppHeader';

import HomePage from '../../pages/HomePage';
import SignUpPage from '../../pages/SignUpPage';
import SignInPage from '../../pages/SignInPage';
import ProjectsPage from '../../pages/ProjectsPage';
import ProjectDetailPage from '../projectDetail/ProjectDetail';
import AddProjectPage from '../../pages/AddProjectPage';

import './app.scss'



function App() {
    return (
        <Provider store={store}>
            <div className='app'>
                <Router>
                    <Header />
                    <main className='app__content'>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/projects" element={<ProjectsPage />} />
                            <Route path="/projects/new" element={<AddProjectPage />} />
                            <Route path="/projects/:projectId" element={<ProjectDetailPage />} /> {/* Страница проекта */}
                        </Routes>
                    </main>
                </Router>
            </div>
        </Provider>
    );
}

export default App;
