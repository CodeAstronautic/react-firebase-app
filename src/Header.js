import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow p-3 mb-5 rounded">
          <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">
              Dashboard
            </a>
            <div className="d-flex align-items-center">
              <p className="text-white m-0 me-2 p-2">{currentUser.email}</p>
              <Button className="m-0 p-2">
                <a className="text-white" href="/update-profile">
                  Edit
                </a>
              </Button>
              <Button variant="light" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
