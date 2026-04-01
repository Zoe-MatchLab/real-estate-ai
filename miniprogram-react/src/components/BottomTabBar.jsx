// 底部TabBar - 完全匹配profile.html样式
export default function BottomTabBar({ currentTab, onTabChange }) {
  const tabs = [
    { id: 'home', icon: 'fa-rocket', href: 'tools.html' },
    { id: 'design', icon: 'fa-paint-brush', href: 'ai-design.html' },
    { id: 'chat', icon: 'fa-commenting', href: 'claw.html' },
    { id: 'calendar', icon: 'fa-calendar', href: 'calendar.html' },
    { id: 'profile', icon: 'fa-user', href: 'profile.html' },
  ]

  const handleClick = (tab) => {
    onTabChange(tab.id)
    // 模拟跳转
    // window.location.href = tab.href
  }

  return (
    <div 
      className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 z-50"
      style={{
        background: 'rgba(29, 33, 41, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.24)',
        border: '1px solid rgba(255,255,255,0.1)',
        minWidth: '280px',
      }}
    >
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="w-11 h-9 rounded-full flex items-center justify-center transition-all"
            onClick={() => handleClick(tab)}
            style={{
              background: currentTab === tab.id ? 'rgba(250, 140, 22, 0.15)' : 'transparent',
              color: currentTab === tab.id ? '#FA8C16' : 'rgba(255,255,255,0.5)',
            }}
          >
            <i className={`fa ${tab.icon} text-lg`} />
          </button>
        ))}
      </div>
    </div>
  )
}
