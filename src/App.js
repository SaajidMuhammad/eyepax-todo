import React, { useState } from "react";
import Login from "./components/login/Login";
import Menu from "./components/todoMenu/Menu";

const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      {isLogged ? (
        <Menu setIsLogged={setIsLogged} />
      ) : (
        <Login setIsLogged={setIsLogged} />
      )}
    </div>
  );
};

export default App;
