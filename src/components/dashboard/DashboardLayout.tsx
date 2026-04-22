import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Sidebar from '../common/Sidebar';

interface Props {
  children: ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-content">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
