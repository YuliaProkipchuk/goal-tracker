import { useParams } from "react-router-dom";
import PlanSection from "../components/Plan/PlanSection";

export default function PlanPage() {
    const { goalId } = useParams();
    return <>
        <PlanSection goalId={goalId}/>
    </>
}