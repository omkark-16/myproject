import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ previousRoute }) => {
  const lastVisited = previousRoute || localStorage.getItem("lastVisited") || "/records/allrecords";

  useEffect(() => {
    if (previousRoute) {
      localStorage.setItem("lastVisited", previousRoute);
    }
  }, [previousRoute]);

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <p><strong>Last Visited:</strong> {lastVisited.replace("/records/", "").toUpperCase()}</p>
      <ul>
        <li><NavLink to="/records/allrecords" onClick={() => localStorage.setItem("lastVisited", "/records/allrecords")}>All Records</NavLink></li>
        <li><NavLink to="/records/insert" onClick={() => localStorage.setItem("lastVisited", "/records/insert")}>Insert</NavLink></li>
        <li><NavLink to="/records/update" onClick={() => localStorage.setItem("lastVisited", "/records/update")}>Update</NavLink></li>
        <li><NavLink to="/records/delete" onClick={() => localStorage.setItem("lastVisited", "/records/delete")}>Delete</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
