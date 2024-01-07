import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './/components/pages/Home'

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
    </Router>
  )
}
