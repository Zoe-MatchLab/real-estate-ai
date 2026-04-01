import React, { useEffect, useState } from 'react';
import './index.css';

interface ToastProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 2000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="toast-container">
      <div className="toast-content">{message}</div>
    </div>
  );
};

export default Toast;

// Toast 管理器
let toastContainer: HTMLDivElement | null = null;

export function showToast(message: string, duration?: number) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toastElement = document.createElement('div');
  toastContainer.appendChild(toastElement);

  const closeToast = () => {
    if (toastElement.parentNode) {
      toastElement.parentNode.removeChild(toastElement);
    }
  };

  // 使用 React 渲染 Toast
  import('react-dom/client').then(({ createRoot }) => {
    const root = createRoot(toastElement);
    root.render(
      <Toast message={message} duration={duration} onClose={closeToast} />
    );
  });
}
