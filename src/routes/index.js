import React, { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../application/User/Login";
import BlankLayout from "../layouts/BlankLayout";

const SuspenseComponent = Component => props => {
  return (
    <Suspense fallback={null}>
      <Component {...props}></Component>
    </Suspense>
  )
}

const RecommendComponent = lazy(() => import("../application/Recommend/"));
const SingersComponent = lazy(() => import("../application/Singers/"));
const RankComponent = lazy(() => import("../application/Rank/"));
const AlbumComponent = lazy(() => import("../application/Album/"));
const SingerComponent = lazy(() => import("./../application/Singer/"));
const SearchComponent = lazy(() => import("./../application/Search/"));
const userCenterComponent = lazy(() => import("../application/UserCenter/"));

export default [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/login",
        component: Login,
      },
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: () => <Redirect to={"/recommend"} />
          },
          {
            path: "/recommend",
            component: SuspenseComponent(RecommendComponent),
            routes: [
              {
                path: "/recommend/:id",
                component: SuspenseComponent(AlbumComponent)
              }
            ]
          },
          {
            path: "/singers",
            component: SuspenseComponent(SingersComponent),
            key: "singers",
            routes: [
              {
                path: "/singers/:id",
                component: SuspenseComponent(SingerComponent)
              }
            ]
          },
          {
            path: "/rank/",
            component: SuspenseComponent(RankComponent),
            key: "rank",
            routes: [
              {
                path: "/rank/:id",
                component: SuspenseComponent(AlbumComponent)
              }
            ]
          },
          {
            path: "/album/:id",
            exact: true,
            key: "album",
            component: SuspenseComponent(AlbumComponent)
          },
          {
            path: "/search",
            exact: true,
            key: "search",
            component: SuspenseComponent(SearchComponent)
          },
          {
            path: "/userCenter",
            exact: true,
            key: "userCenter",
            component: SuspenseComponent(userCenterComponent)
          }
        ]
      }
    ]
  }
];
