import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  number: number;
  text: string;
  type: string;
  options: Option[];
  analysis: {
    correctAnswer: string;
    explanation: string[];
  };
}

const Exam: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentQuestion] = useState<Question>({
    id: '2',
    number: 2,
    text: '中海汇德里项目的主力户型面积不包含以下哪个选项？',
    type: '单选题',
    options: [
      {
        id: 'A',
        text: '77㎡ 两室一厅一卫',
        isCorrect: false,
      },
      {
        id: 'B',
        text: '99㎡ 三室两厅两卫',
        isCorrect: false,
      },
      {
        id: 'C',
        text: '112㎡ 四室两厅两卫',
        isCorrect: true,
      },
      {
        id: 'D',
        text: '140㎡ 四室两厅三卫',
        isCorrect: false,
      },
    ],
    analysis: {
      correctAnswer: 'C. 112㎡ 四室两厅两卫',
      explanation: [
        '中海汇德里项目主力户型为：',
        '1. 77㎡ 两室一厅一卫（刚需户型）',
        '2. 99㎡ 三室两厅两卫（主流改善）',
        '3. 140㎡ 四室两厅三卫（高端改善）',
        '112㎡四室户型为本项目不包含的户型，相似户型为115㎡三室两厅两卫。',
      ],
    },
  });

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setShowAnalysis(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleNextQuestion = () => {
    showToast('跳转到下一题');
  };

  const handleReportQuestion = () => {
    showToast('举报题目功能');
  };

  const handleBookmark = () => {
    showToast('收藏题目');
  };

  const handleFeedback = () => {
    showToast('反馈功能');
  };

  const handleViewAllMaterials = () => {
    showToast('查看全部参考材料');
  };

  const handleConfirmSubmit = () => {
    showToast('确认交卷');
    setShowConfirmModal(false);
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseExam = () => {
    setShowConfirmModal(true);
  };

  return (
    <div className="exam-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <div className="header-center">
          <h1 className="page-title">中海汇德里产品训练</h1>
          <span className="question-progress">第2题/共20题</span>
        </div>
        <button className="close-btn" onClick={handleCloseExam}>
          <i className="fa fa-close" />
        </button>
      </div>

      {/* 进度条 */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: '10%' }} />
      </div>

      {/* 考试内容 */}
      <div className="exam-content">
        {/* 题目 */}
        <div className="question-card">
          <div className="question-header">
            <span className="question-number">{currentQuestion.number}</span>
            <div className="question-info">
              <h3 className="question-text">{currentQuestion.text}</h3>
              <p className="question-meta">
                <i className="fa fa-info-circle mr-1" />
                本题为{currentQuestion.type}，共1分
              </p>
            </div>
          </div>
        </div>

        {/* 选项 */}
        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`option-item ${selectedOption === option.id ? 'selected' : ''} ${showAnalysis && option.isCorrect ? 'correct' : ''} ${showAnalysis && selectedOption === option.id && !option.isCorrect ? 'wrong' : ''}`}
              onClick={() => !showAnalysis && handleOptionSelect(option.id)}
            >
              <div className="option-radio">
                {showAnalysis ? (
                  option.isCorrect ? (
                    <i className="fa fa-check text-success" />
                  ) : selectedOption === option.id ? (
                    <i className="fa fa-times text-danger" />
                  ) : (
                    <div className="radio-circle" />
                  )
                ) : (
                  <>
                    <div className="radio-circle" />
                    {selectedOption === option.id && <div className="radio-dot" />}
                  </>
                )}
              </div>
              <span className="option-text">{option.id}. {option.text}</span>
            </div>
          ))}
        </div>

        {/* 解析（答题后显示） */}
        {showAnalysis && (
          <div className="analysis-card">
            <div className="analysis-header">
              <div className="analysis-icon">
                <i className="fa fa-check" />
              </div>
              <div className="analysis-info">
                <h4 className="analysis-title">回答{selectedOption === currentQuestion.options.find(opt => opt.isCorrect)?.id ? '正确' : '错误'}！</h4>
                <p className="analysis-correct">
                  <strong>正确答案：{currentQuestion.analysis.correctAnswer}</strong>
                </p>
                <div className="analysis-explanation">
                  <p className="explanation-title">解析：</p>
                  {currentQuestion.analysis.explanation.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
                <button className="next-question-btn" onClick={handleNextQuestion}>
                  下一题
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 材料卡片 */}
        <div className="materials-card">
          <div className="materials-header">
            <h4 className="materials-title">
              <i className="fa fa-file-text-o mr-1" />
              参考材料
            </h4>
            <button className="view-all-btn" onClick={handleViewAllMaterials}>
              查看全部
            </button>
          </div>
          <p className="materials-content">
            中海汇德里项目位于海淀区核心板块，总建筑面积20万㎡，容积率2.4，绿化率30%。项目由8栋小高层组成，总户数1200户，主力户型为77㎡两居、99㎡三居、140㎡四居，全部为精装修交付，预计2028年6月交房。
          </p>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="bottom-bar">
        <div className="bottom-actions">
          <button className="action-btn" onClick={handleReportQuestion}>
            <i className="fa fa-flag-o mr-1" />
            举报题目
          </button>
          <div className="action-buttons">
            <button className="action-btn" onClick={handleBookmark}>
              <i className="fa fa-bookmark-o mr-1" />
              收藏
            </button>
            <button className="action-btn" onClick={handleFeedback}>
              <i className="fa fa-comment-o mr-1" />
              反馈
            </button>
          </div>
        </div>
        <button
          className={`submit-btn ${selectedOption ? 'active' : ''} ${isSubmitting ? 'submitting' : ''}`}
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fa fa-spinner fa-spin mr-1" />
              提交中...
            </>
          ) : (
            '提交答案'
          )}
        </button>
      </div>

      {/* 交卷确认弹窗 */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">确认交卷？</h3>
            <p className="modal-message">
              你已经完成20道题，还有0道题未答<br />
              交卷后将不能继续修改答案
            </p>
            <div className="modal-buttons">
              <button className="modal-btn cancel-btn" onClick={handleCloseModal}>
                取消
              </button>
              <button className="modal-btn confirm-btn" onClick={handleConfirmSubmit}>
                确认交卷
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;