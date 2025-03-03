import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { DarkModeProvider } from "./components/DarkModeContext";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/sidebar";
import About from "./navbar/about";
import Contact from "./navbar/contact";
import Home from "./navbar/home";
import Navbar from "./navbar/navbar";
import Nopage from "./navbar/nopage";
import ListPostdelete from "./Restdemos/Listpostdelete";
import Listpost from "./Restdemos/Listposts";
import ListPostsInsert from "./Restdemos/Listpostsinsert";
import ListPostsUpdate from "./Restdemos/Listpostupdate";
import LoginComponent from "./Restdemos/loginpage2";

const App = () => {
  return (
    <DarkModeProvider>
    <BrowserRouter>
      <Navbar />
      <MainContent />
    </BrowserRouter>
    </DarkModeProvider>
  );
};

const MainContent = () => {
  const location = useLocation();
  const [previousRoute, setPreviousRoute] = useState(
    localStorage.getItem("lastVisited") || "/records/allrecords"
  );
  const [currentRoute, setCurrentRoute] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== "/login") {
      // Store previous route before updating the current one
      if (location.pathname !== currentRoute) {
        setPreviousRoute(currentRoute);
        localStorage.setItem("lastVisited", currentRoute);
        setCurrentRoute(location.pathname);
      }
    }
  }, [location, currentRoute]);

  return (
    <div style={{ display: "flex" }}>
      {location.pathname.startsWith("/records") && (
        <Sidebar previousRoute={previousRoute} />
      )}
      <div
        style={{
          marginLeft: location.pathname.startsWith("/records") ? "220px" : "0",
          padding: "20px",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="*" element={<Nopage />} />

          <Route path="/records" element={<ProtectedRoute element={<Dashboard />} />}>
            <Route index element={<Navigate to="/records/allrecords" replace />} />
            <Route path="allrecords" element={<Listpost />} />
            <Route path="insert" element={<ListPostsInsert />} />
            <Route path="update" element={<ListPostsUpdate />} />
            <Route path="delete" element={<ListPostdelete />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
