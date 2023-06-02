import { Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import UsersView from "./pages/UsersView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:idusers" element={<UsersView />} />
    </Routes>
  );
}

export default App;
