import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Footer } from './footer';

export const Layout: FC = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
