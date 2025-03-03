import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout(){
    return(
        <div>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
            <main>
            
            </main>
            <footer>
                <p>Copyright &copy; 2025 My React App</p>
            </footer>
        </div>
    )
}