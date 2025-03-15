import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),
  route("game/:id", "routes/GameDetail.tsx"),
  route("acerca-de", "routes/AboutPage.tsx")
] satisfies RouteConfig;
