import { Outlet } from "react-router-dom";
import './dashboard.css';
import Sidebar from "./sidebar";

const Dashboard=()=>{
    return (
    <div className="dashboard-container">
        <Sidebar></Sidebar>
        <div className="dashboard-content">
            <Outlet></Outlet>

        </div>


    </div>
    )
}

export default Dashboard;