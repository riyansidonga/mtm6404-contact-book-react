import { Routes, Route, NavLink } from "react-router-dom"
import ContactList from "./pages/ContactList"
import ContactDetails from "./pages/ContactDetails"
import ContactForm from "./pages/ContactForm"
export default function App() {

  return (
    <div className="app">
      <header className="header">
        <h1>Contact Book</h1>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "btn-active" : "")}
            >Home
          </NavLink>
          <NavLink
            to="/new"
            className={({ isActive }) => (isActive ? "btn-active" : "")}
            >Add Contact
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contacts/:id" element={<ContactDetails />} />
          <Route path="/new" element={<ContactForm />} />
          <Route path="/edit/:id" element={<ContactForm />} />
        </Routes>
      </main>
    </div>
  )
}
