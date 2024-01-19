import { Link, useLoaderData } from "react-router-dom";

export async function usersLoader() {
    const users = ["Shuttleu", "Xeechu"];
    return { users };
  }

export default function Users() {

  const { users } = useLoaderData();
  console.log(users);

    return (
        <>
            {users.map((user, index) => {
                return <Link to={`/user/${index}`}>{user}</Link>
            })}
        </>
    );
};