import React from 'react';
import './index.css';

const AIDesign: React.FC = () => {
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  return (
    <div className="ai-design-page">
      {/* 顶部标题 */}
      <div className="page-header">
        <h1 className="page-title">AI设计工具</h1>
        <p className="page-subtitle">一键生成专业物料</p>
      </div>

      {/* 设计工具分类 */}
      <div className="tools-container">
        {/* 户型设计 */}
        <div className="tool-section">
          <h3 className="section-title">
            <i className="fa fa-th-large text-primary mr-2" />
            户型设计
          </h3>
          <div className="tool-grid">
            <div className="design-card" onClick={() => showToast('户型图生成')}>
              <div className="card-icon cyan">
                <i className="fa fa-home text-white text-xl" />
              </div>
              <h4 className="card-title">户型图生成</h4>
              <p className="card-description">根据需求智能生成</p>
            </div>
            <div className="design-card" onClick={() => showToast('户型解说图')}>
              <div className="card-icon blue">
                <i className="fa fa-comment text-white text-xl" />
              </div>
              <h4 className="card-title">户型解说图</h4>
              <p className="card-description">带标注的户型展示</p>
            </div>
          </div>
        </div>

        {/* 宣传物料 */}
        <div className="tool-section">
          <h3 className="section-title">
            <i className="fa fa-image text-primary mr-2" />
            宣传物料
          </h3>
          <div className="tool-grid">
            <div className="design-card" onClick={() => showToast('卖点海报')}>
              <div className="card-icon purple">
                <i className="fa fa-star text-white text-xl" />
              </div>
              <h4 className="card-title">卖点海报</h4>
              <p className="card-description">一键生成宣传海报</p>
            </div>
            <div className="design-card" onClick={() => showToast('朋友圈九宫格')}>
              <div className="card-icon pink">
                <i className="fa fa-th text-white text-xl" />
              </div>
              <h4 className="card-title">朋友圈九宫格</h4>
              <p className="card-description">惊艳朋友圈展示</p>
            </div>
            <div className="design-card" onClick={() => showToast('户型单页')}>
              <div className="card-icon green">
                <i className="fa fa-file-text text-white text-xl" />
              </div>
              <h4 className="card-title">户型单页</h4>
              <p className="card-description">精美户型单页设计</p>
            </div>
            <div className="design-card" onClick={() => showToast('楼书封面')}>
              <div className="card-icon yellow">
                <i className="fa fa-book text-white text-xl" />
              </div>
              <h4 className="card-title">楼书封面</h4>
              <p className="card-description">专业楼书封面设计</p>
            </div>
          </div>
        </div>

        {/* 视频物料 */}
        <div className="tool-section">
          <h3 className="section-title">
            <i className="fa fa-video-camera text-primary mr-2" />
            视频物料
          </h3>
          <div className="tool-grid">
            <div className="design-card" onClick={() => showToast('样板间视频')}>
              <div className="card-icon red">
                <i className="fa fa-film text-white text-xl" />
              </div>
              <h4 className="card-title">样板间视频</h4>
              <p className="card-description">VR视频素材剪辑</p>
            </div>
            <div className="design-card" onClick={() => showToast('项目宣传片')}>
              <div className="card-icon indigo">
                <i className="fa fa-youtube-play text-white text-xl" />
              </div>
              <h4 className="card-title">项目宣传片</h4>
              <p className="card-description">楼盘宣传视频制作</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesign;
