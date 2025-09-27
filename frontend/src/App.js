import { createContext, useContext, useState } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Consume in Navbar
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="flex justify-between p-4 bg-gray-200">
      <h1>MyApp</h1>
      {user ? (
        <div>
          Welcome, {user.name}! 
          <button onClick={logout} className="ml-2 text-red-500">Logout</button>
        </div>
      ) : (
        <span>Guest</span>
      )}
    </div>
  );
}

// 4. A button that logs in user
function LoginButton() {
  const { login } = useContext(AuthContext);
  return (
    <button
      onClick={() => login("Alice")}
      className="m-4 bg-green-500 p-2 text-white"
    >
      Login as Alice
    </button>
  );
}

// 5. Wrap everything in AuthProvider
function App() {
  return (
    <AuthProvider>
      <Navbar />
      <LoginButton />
    </AuthProvider>
  );
}

export default App;
