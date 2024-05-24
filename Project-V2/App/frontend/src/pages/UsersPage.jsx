import { Routes, Route, Link } from "react-router-dom";
import UsersTable from "../components/Users/UsersTable";
import CreateUser from "../components/Users/CreateUser";
import UpdateUser from "../components/Users/UpdateUser";

function UsersPage() {
  return (
    <div>
      <h2>Users Page</h2>
      <nav>
        <ul>
          <li>
            <Link to="/users">Users Table</Link>
          </li>
          <li>
            <Link to="/users/add">Add User</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/add" element={<CreateUser />} />
        <Route path="/edit/:userID" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}

export default UsersPage;
