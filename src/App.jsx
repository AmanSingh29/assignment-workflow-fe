import Navbar from "./components/navbar/NavBar";
import { useAuth } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      {isAuthenticated && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;
