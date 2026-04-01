import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

interface TabItem {
  path: string;
  icon: string;
  activeIcon?: string;
  label: string;
}

interface TabBarProps {
  tabs: TabItem[];
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="tab-bar-container">
      <div className="tab-bar-inner">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <div
              key={tab.path}
              className={`tab-bar-item ${isActive ? 'active' : ''}`}
              onClick={() => handleClick(tab.path)}
            >
              <i className={`fa ${isActive ? tab.activeIcon || tab.icon : tab.icon}`} />
              <span className="tab-bar-label">{tab.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
