import React, { useEffect, useState } from "react";
import Login from "./components/login/Login";
import Menu from "./components/todoMenu/Menu";

const App = () => {
  const [isLogged, setIsLogged] = useState(
    sessionStorage.getItem("user-authenticated") || false
  );

  useEffect(() => {
    setIsLogged(sessionStorage.getItem("user-authenticated"));
  }, []);

  return (
    <div>
      {!isLogged ? (
        <Login setIsLogged={setIsLogged} />
      ) : (
        <Menu setIsLogged={setIsLogged} />
      )}
    </div>
  );
};

export default App;
