

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); 
  if (!user) return <p>Loading...</p>;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Profile</h2>
      <img src={user.photo} alt={user.name} width={100} />
      <p>Name: {user.name}</p>
      <p>
        Role:{" "}
        {user.roles?.map((role) => role.name).join(", ") || "N/A"}
      </p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p>
      <button onClick={handleLogout}>Logout</button>
      <Link to="/bo">Go to Bo Profile</Link>
      
    </div>
  );
};

export default Profile;
