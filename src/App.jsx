import { useState, lazy, Suspense } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import './App.css';

// Lazy load quiz views - only loaded when user selects a module
const QuizView = lazy(() => import('./components/QuizView'));
const UpdateQuizView = lazy(() => import('./components/UpdateQuizView'));

// Loading fallback
const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
            <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Loading Module...</p>
        </div>
    </div>
);

function App() {
    const [currentView, setCurrentView] = useState('home'); // home, quiz, update
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [selectedUpdateId, setSelectedUpdateId] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedUpdate, setSelectedUpdate] = useState(null);

    const handleSelectTest = async (id) => {
        setSelectedTestId(id);
        // Lazy load only the needed data
        const { listeningData } = await import('./data/listening_data');
        setSelectedTest(listeningData.find(t => t.id === id));
        setCurrentView('quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectUpdate = async (id) => {
        setSelectedUpdateId(id);
        const { updateModules } = await import('./data/listening_data');
        setSelectedUpdate(updateModules.find(m => m.id === id));
        setCurrentView('update');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRandomTest = () => {
        const randomId = Math.floor(Math.random() * 15) + 1;
        handleSelectTest(randomId);
    };

    return (
        <Layout>
            {currentView === 'home' ? (
                <HomeView
                    onSelectTest={handleSelectTest}
                    onSelectUpdate={handleSelectUpdate}
                    onRandomTest={handleRandomTest}
                />
            ) : currentView === 'update' ? (
                <Suspense fallback={<LoadingFallback />}>
                    {selectedUpdate && (
                        <UpdateQuizView
                            module={selectedUpdate}
                            onBack={() => setCurrentView('home')}
                        />
                    )}
                </Suspense>
            ) : (
                <Suspense fallback={<LoadingFallback />}>
                    {selectedTest && (
                        <QuizView
                            test={selectedTest}
                            onBack={() => setCurrentView('home')}
                        />
                    )}
                </Suspense>
            )}
        </Layout>
    );
}

export default App;
