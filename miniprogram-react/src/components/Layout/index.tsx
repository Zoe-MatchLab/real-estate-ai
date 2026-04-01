import React from 'react';
import TabBar from '../TabBar';
import './index.css';

interface LayoutProps {
  children: React.ReactNode;
  showTabBar?: boolean;
  tabs?: Array<{
    path: string;
    icon: string;
    activeIcon?: string;
    label: string;
  }>;
}

const defaultTabs = [
  { path: '/tools', icon: 'fa-rocket', label: '工具' },
  { path: '/ai-design', icon: 'fa-paint-brush', label: '设计' },
  { path: '/claw', icon: 'fa-commenting', label: 'Claw' },
  { path: '/calendar', icon: 'fa-calendar', label: '日历' },
  { path: '/profile', icon: 'fa-user', label: '我的' },
];

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showTabBar = true,
  tabs = defaultTabs 
}) => {
  return (
    <div className="layout-container">
      <div className="layout-content">
        {children}
      </div>
      {showTabBar && <TabBar tabs={tabs} />}
    </div>
  );
};

export default Layout;
