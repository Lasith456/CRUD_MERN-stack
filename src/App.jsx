import { Route,Routes,Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const App=()=>{
  return (
    <div>
      <nav className="bg-gray-800">
<div className="container p-2 mx-auto">
  <Link to="/"><h2 className="text-2xl font-bold text-white">NaviPOS</h2></Link>
</div>
      </nav>
      <div className="container h-full p-2 mx-auto">
        <Routes>
          <Route index element ={<HomePage/>}></Route>
          <Route path="/create" element={<CreatePage/>}></Route>
          <Route path="/edit/:id" element={<EditPage/>}></Route>
        </Routes>
      </div>
        <ToastContainer/>
    </div>
  )
}

export default App
