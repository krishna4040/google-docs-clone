import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Document from './pages/Document'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/documents/:roomId' element={<Document/>} />
      </Routes>
    </div>
  )
}

export default App