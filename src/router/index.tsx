import { Button, Result } from '@arco-design/web-react';
import { Navigate, Route, Link } from 'react-router-dom';
import WithLayout from '@/layout/WithLayout';
import Home from '@/pages/Home';

// const Home = React.lazy(() => import('@/pages/Home'));

interface Route {
  path: string;
  element: JSX.Element;
  children?: Route[];
}
type Routes = Route[];

export default function routerHelper(routes: Routes) {
  return routes.map(route => (
    <Route
      key={route.path}
      path={route.path}
      element={route.element}
    >
      {route.children ? routerHelper(route.children) : <></>}
    </Route>
  ));
}

export const enum ROUTES_PATH {
  HOME = '/home'
}

export const routes: Route[] = [
  {
    path: ROUTES_PATH.HOME,
    element: (
      <WithLayout>
        <Home />
      </WithLayout>
    )
  },
  // {
  //   path:  '/protected',
  //   element:  <ProtectedPage  />,
  //   //  假设你需要登录后才能访问这个页面
  //   loader:  async  ()  =>  {
  //     //  这里可以是异步检查用户是否登录的逻辑
  //     //  如果用户未登录，返回null，否则返回用户信息
  //     return  null;  //  或者用户信息
  //   },
  //   action:  async  ({  loaderData  })  =>  {
  //     if  (!loaderData)  {
  //       //  用户未登录，重定向到登录页面
  //       return  <Navigate  to="/login"  replace  />;
  //     }
  //     //  用户已登录，渲染页面
  //     return  <ProtectedPage  />;
  //   },
  // },
  //  重定向到首页
  {
    path: '/',
    element: (
      <Navigate
        to={ROUTES_PATH.HOME}
        replace
      />
    )
  },
  //  其他路由...
  {
    path: '*',
    element: (
      <Result
        className=' h-screen flex justify-center items-center flex-col'
        status='404'
        title='页面走丢了，去看看其他的吧~'
        subTitle=''
        extra={[
          <Button
            key='back'
            type='primary'
          >
            <Link
              to={ROUTES_PATH.HOME}
              replace
            >
              回到首页
            </Link>
          </Button>
        ]}
      ></Result>
    )
  }
];
