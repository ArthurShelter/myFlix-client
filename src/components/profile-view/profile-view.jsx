import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const ProfileView = ({ users }) => {
    const { userId } = useParams();

    const user = users.find((u) => u.id === userId);
  

    return (
      <div>
        <div>
          <span>Username: </span>
          <span>{user.Username}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{user.Email}</span>
        </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    );
  };