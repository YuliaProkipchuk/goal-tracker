import { useSearchParams } from "react-router-dom";
import GoalsGrid from "../components/Goals/GoalsGrid";
import GoalsNav from "../components/Goals/GoalsNav";
import Header from "../components/Header/Header";
import { useGetGoalsQuery } from "../features/goals/goalApiSlice";
import useAuth from "../hooks/useAuth";

export default function HomePage() {
  let [searchParams] = useSearchParams();
  const {
    data: goals,
    isLoading,
    isError,
    error,
  } = useGetGoalsQuery(searchParams.get("q"));
  const { id, username } = useAuth();

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    console.log(error);
  }

  return (
    <>
      <Header />
      {!isLoading && (
        <main className="home-main">
          <div className="home-section">
            <GoalsNav />
            <p className="welcome-p">Hello, {username}</p>
            <div className="line"></div>
              <GoalsGrid goals={goals.goals} />
             
          </div>
        </main>
      )}
    </>
  );
}

