import { useParams } from "react-router";

export default function GamePage() {
  const { gameId } = useParams();

  return <div>{gameId}</div>;
}
