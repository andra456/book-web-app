import React, { lazy } from "react";
import MainRoutes from "./main";

import { BiDoorOpen } from "react-icons/bi";

const Home = lazy(() => import("../pages/home"));
const Watch = lazy(() => import("../pages/detail"));
const Intro = lazy(() => import("../pages/intro"));

enum Layout {
  SIDEBAR = "sidebar",
  BLANK = "blank",
  NOSIDEBAR = "nosidebar",
}

const set = {
  exact: true,
  sensitive: true,
  strict: true,
};

interface RouteList {
  exact: boolean;
  sensitive: boolean;
  strict: boolean;

  text: string;
  icon?: JSX.Element | null;
  menu: boolean;
  path: string;
  layout: Layout;
  children: JSX.Element;
  private: boolean;
}

export const routeList: RouteList[] = [
  {
    ...set,
    text: "Books list",
    icon: <BiDoorOpen />,
    menu: true,
    path: "/explore",
    layout: Layout.SIDEBAR,
    children: <Home />,
    private: true,
  },
  {
    ...set,
    text: "intro",
    icon: null,
    menu: false,
    path: "/",
    layout: Layout.BLANK,
    children: <Intro />,
    private: false,
  },
  {
    ...set,
    text: "watch",
    icon: null,
    menu: false,
    path: "/read/:Id",
    layout: Layout.NOSIDEBAR,
    children: <Watch />,
    private: true,
  },
];

const Routes = () => <MainRoutes options={routeList} />;

export default Routes;
