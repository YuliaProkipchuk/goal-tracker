import { json, useLoaderData, useRouteLoaderData } from "react-router-dom";
import GoalsGrid from "../components/Goals/GoalsGrid";
import GoalsNav from "../components/Goals/GoalsNav";
import Header from "../components/Header/Header";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/Root";
import GoalsStatistic from "../components/Goals/GoalsStatistic";

export default function HomePage() {
  const { setIsToken } = useContext(AuthContext);
  const data = useRouteLoaderData("user");

  const searchData = useLoaderData();
  const goals = searchData?.goals;
  const [isSearch, setIsSearch] = useState(false);
  const outputGoals = isSearch ? goals : data?.user.goals;
  // console.log(data?.user.goals, outputGoals, isSearch);
  useEffect(() => {
    if (data) {
      setIsToken(true);
    }
  }, [data, setIsToken]);
  return (
    <>
      <Header />
      <main>
        {data && (
          <>
            <GoalsNav
              todoId={data.user.todos._id}
              onBlur={() => setIsSearch(true)}
            />
            <p className="welcome-p">Hello, {data.user.username}</p>
            <div className="line"></div>
            <section className="home-main">
              <GoalsGrid goals={outputGoals} />
              <GoalsStatistic goals={data.user.goals} />
            </section>
          </>
        )}
      </main>
    </>
  );
}
export async function loader({ params, request }) {
  const token = localStorage.getItem("token");
  const URl = new URL(request.url);
  const searchTerm = URl.searchParams.get("q");
  console.log(searchTerm);

  let url = "http://localhost:8080/goals/search?q=" + searchTerm;

  console.log(searchTerm);
  if (token) {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.error(data.message);
    }
    return data;
  }else{
    if(searchTerm) throw json({message:'Unauthorized'}, {status:401});
    else return null
  }
  
}

export async function action({ request }) {
  const formData = await request.formData();
  const goalId = formData.get("id");
  const token = localStorage.getItem("token");
  await fetch(`http://localhost:8080/goals/${goalId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return { m: "success" };
}
