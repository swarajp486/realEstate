import {routes} from "./routes"
import { useRoutes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import "./App.css"

function App() {
  const element=useRoutes(routes)
  return (
    <>
    <Navbar/>
   
    {element}
    </>
  );
}

export default App;
