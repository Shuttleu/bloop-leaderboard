import { useLoaderData } from "react-router-dom";

export async function userLoader({ params }) {
    const user = params.id;
    return { user };
  }

export default function User(props) {


  const { user } = useLoaderData();

    return (
        <>
            User View: {user}
        </>
    );
};