import Routes from './routes/index.jsx';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TasksContext';
import { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  return(
    <AuthProvider>
      <TaskProvider>
        <Toaster reverseOrder={false} toastOptions={{ duration: 2000, style: { marginTop: '40vh', transform: 'translateY(-50%)' } }}/>
        <Routes />
      </TaskProvider> 
    </AuthProvider>
  );
}

export default App