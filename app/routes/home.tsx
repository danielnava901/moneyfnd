import type { Route } from "./+types/home";
import Money from "~/pages/money";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Money Exchange" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Money />;
}
