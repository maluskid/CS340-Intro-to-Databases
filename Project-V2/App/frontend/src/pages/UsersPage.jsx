import { Routes, Route, Link } from "react-router-dom";
import UsersTable from "../components/Users/UsersTable";
import CreateUser from "../components/Users/CreateUser";
// import PeopleTable from "../components/bsg_people/PersonTable";
// import UpdatePerson from "../components/bsg_people/UpdatePerson";

function UsersPage() {
  return (
    <div>
      <h1>Users Page</h1>
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
        {/* <Route path="/edit/:id" element={<UpdatePerson />} /> */}
      </Routes>
    </div>
  );
}

export default UsersPage;
