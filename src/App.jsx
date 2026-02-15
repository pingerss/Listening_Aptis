import { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import QuizView from './components/QuizView';
import UpdateQuizView from './components/UpdateQuizView';
import { listeningData, updateModules } from './data/listening_data';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('home'); // home, quiz, update
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [selectedUpdateId, setSelectedUpdateId] = useState(null);

    const handleSelectTest = (id) => {
        setSelectedTestId(id);
        setCurrentView('quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectUpdate = (id) => {
        setSelectedUpdateId(id);
        setCurrentView('update');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRandomTest = () => {
        const randomId = Math.floor(Math.random() * 15) + 1;
        handleSelectTest(randomId);
    };

    const selectedTest = selectedTestId ? listeningData.find(t => t.id === selectedTestId) : null;
    const selectedUpdate = selectedUpdateId ? updateModules.find(m => m.id === selectedUpdateId) : null;

    return (
        <Layout>
            {currentView === 'home' ? (
                <HomeView
                    onSelectTest={handleSelectTest}
                    onSelectUpdate={handleSelectUpdate}
                    onRandomTest={handleRandomTest}
                />
            ) : currentView === 'update' ? (
                <UpdateQuizView
                    module={selectedUpdate}
                    onBack={() => setCurrentView('home')}
                />
            ) : (
                <QuizView
                    test={selectedTest}
                    onBack={() => setCurrentView('home')}
                />
            )}
        </Layout>
    );
}

export default App;
