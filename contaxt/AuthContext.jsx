const { createContext, useState, useEffect } = require("react");
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoggedIn, serIsLoggedIn] = useState(false);
  const getAuthData = () => {
    const AuthData = JSON.parse(window.localStorage.getItem("isLoggedin"));
    serIsLoggedIn(AuthData);
  };
  const setAuthData = (data) => {
    window.localStorage.setItem("isLoggedin", JSON.stringify(data));
    serIsLoggedIn(data);
  };
  useEffect(() => {
    const auth = window.localStorage.getItem("isLoggedIn");
    if (!auth) {
      window.localStorage.setItem("isLoggedIn", JSON.stringify(false));
    }
    getAuthData();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
