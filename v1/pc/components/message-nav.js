// 消息导航脚本 - 在页面加载时自动加载消息下拉组件
document.addEventListener('DOMContentLoaded', function() {
    // 延迟加载消息组件，确保DOM已就绪
    setTimeout(loadMessageComponent, 100);
});

function loadMessageComponent() {
    const container = document.getElementById('messageComponent');
    if (!container) return;
    
    // 确定组件路径
    const path = window.location.pathname;
    let componentPath = 'components/message-dropdown.component.html';
    
    // 如果在子目录中，需要调整路径
    if (path.includes('/pc/')) {
        const depth = (path.match(/\//g) || []).length - 2;
        componentPath = '../'.repeat(depth) + 'components/message-dropdown.component.html';
    }
    
    fetch(componentPath)
        .then(r => r.text())
        .then(html => {
            container.innerHTML = html;
            // 执行组件脚本
            const scripts = container.getElementsByTagName('script');
            for (let script of scripts) {
                eval(script.textContent);
            }
        })
        .catch(err => {
            console.log('消息组件加载失败:', err);
        });
}
