import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { List } from './List'
import { Single } from './Single'
import { Denmark } from './Denmark'

import './App.css'

export const App = () => {
 
  return (
    <>
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} className={({isActive}) => "nav-link" + (isActive ? ' active' : '')}>
              <span className="nav-link">Csatahajók</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/denmark'} className={({isActive}) => "nav-link" + (isActive ? ' active' : '')}>
              <span className="nav-link">A Denmark Strait csata</span></NavLink>
            </li>
          </ul>
        </div>
      </nav>
       <Routes>
         <Route path="/" element={<List />} />
         <Route path="/single/:shipNev" element={<Single />} />
         <Route path="/denmark" element={<Denmark />} />
       </Routes>
    </Router>
     
    </>
  )
}

export default App