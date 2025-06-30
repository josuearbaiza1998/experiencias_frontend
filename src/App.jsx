import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/login.jsx"
import { Dashboard } from "./pages/dashboard.jsx"
import { Register } from "./pages/register.jsx"


function App() {

  const isLoggedIn = !!localStorage.getItem("token");

  if (!isLoggedIn && window.location.pathname === "/dashboard") {
    window.location.href = "/login";
    return null;
  }

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  )
}

export default App
