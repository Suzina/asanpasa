import { useState } from 'react'
import './assets/css/custom.css'
import Login from './Components/Login';
import { AuthProvider } from './context/AuthProvider';

function App() {
  const [count, setCount] = useState(0)

  return (
 <AuthProvider>
      <main className="App">
        <Login />
      </main>
    </AuthProvider>
  )
}

export default App
