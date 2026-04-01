import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  time: string;
}

const Claw: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '你好👋 我是你的专属房产AI助手Claw，有什么可以帮到你？',
      time: '10:00',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string, duration: number = 2000) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // 模拟 AI 回复
    setTimeout(() => {
      setIsTyping(false);
      
      let reply = '';
      if (inputValue.includes('政策')) {
        reply = '2026年上海最新购房政策：\n1. 限购政策：本市户籍限购2套，非本市户籍缴纳社保满5年限购1套\n2. 贷款政策：首套首付35%，二套普通首付50%，非普通首付70%\n3. 人才政策：重点产业高层次人才可直接落户，不受社保限制';
      } else if (inputValue.includes('文案') || inputValue.includes('朋友圈')) {
        reply = '给你写一条中海汇德里的朋友圈文案：\n🔥 张江核心红盘【中海汇德里】盛大加推\n✅ 13号线张江路站500米，中环旁出行无忧\n✅ 95-142㎡精装3-4房，低密度居住社区\n✅ 周边产业聚集，升值潜力巨大\n💬 感兴趣的朋友随时咨询，预约看房享专属优惠！';
      } else if (inputValue.includes('客户') || inputValue.includes('议价') || inputValue.includes('价格高')) {
        reply = '客户说价格太高可以这样应对：\n1. 价值认同法："哥/姐，这个价格对应这样的地段、配套、品质，其实性价比非常高，周边同类型项目都比这个贵了"\n2. 拆分价格法："算下来每平才6.8万，100平的房子首付才200多万，您每个月还款也就1万多，以您的收入完全没问题"\n3. 突出稀缺性："这个户型整个小区只有20套，现在已经卖了15套了，您今天定还能享受开盘优惠，明天就收回了"';
      } else if (inputValue.includes('探盘报告') || inputValue.includes('报告怎么写')) {
        reply = '专业探盘报告结构：\n1. 项目基础信息：位置、开发商、均价、户数、容积率、绿化率\n2. 区位分析：交通、配套、板块规划\n3. 产品分析：户型解析、优缺点、装修标准\n4. 客群分析：适合购买人群\n5. 销售政策：优惠、付款方式\n6. 个人总结：推荐指数、适合客户类型';
      } else if (inputValue.includes('中海汇德里')) {
        reply = '中海汇德里项目优点：\n✅ 区位优势明显，位于浦东核心张江板块，周边产业聚集，购买力强\n✅ 交通便利，距离13号线张江路站仅500米，自驾可快速接入中环\n✅ 配套成熟，周边有张江商业广场、万科活力城等商业体\n\n缺点：\n⚠️ 均价6.8万/㎡，相比周边同类型项目略高\n⚠️ 小区容积率2.5，居住密度稍高';
      } else {
        reply = '好的，我了解你的问题了，我正在整理相关资料，稍后给你详细解答~';
      }

      const aiResponse: Message = {
        id: Date.now() + 1,
        type: 'ai',
        content: reply,
        time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const sendQuickQuestion = (question: string) => {
    setInputValue(question);
    handleSend();
  };

  const clearChat = () => {
    if (confirm('确定要清空所有聊天记录吗？')) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: '你好👋 我是你的专属房产AI助手Claw，有什么可以帮到你？',
          time: `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, '0')}`,
        },
      ]);
      showToast('聊天记录已清空');
    }
  };

  return (
    <div className="claw-page">
      {/* 顶部导航 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="fa fa-angle-left text-xl" />
        </button>
        <h1 className="page-title">Claw AI助手</h1>
        <button className="clear-btn" onClick={clearChat}>
          <i className="fa fa-trash-o text-lg" />
        </button>
      </div>

      {/* 聊天内容区域 */}
      <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${message.type === 'user' ? 'message-user' : 'message-ai'}`}
          >
            {message.type === 'ai' && (
              <div className="message-avatar ai">
                🤖
              </div>
            )}
            <div className={`message-bubble ${message.type === 'user' ? 'user-message' : 'ai-message'}`}>
              <p className="message-content">{message.content}</p>
              <p className={`message-time ${message.type === 'user' ? 'user-time' : 'ai-time'}`}>{message.time}</p>
            </div>
            {message.type === 'user' && (
              <div className="message-avatar user">
                你
              </div>
            )}
          </div>
        ))}

        {/* 快捷提问卡片 */}
        {messages.length === 1 && (
          <div className="quick-questions">
            <p className="quick-questions-title">你可以问我：</p>
            <div className="quick-questions-grid">
              <div className="quick-question-item" onClick={() => sendQuickQuestion('上海最新购房政策是什么？')}>
                <p className="quick-question-text">上海最新购房政策</p>
              </div>
              <div className="quick-question-item" onClick={() => sendQuickQuestion('如何撰写房产朋友圈文案？')}>
                <p className="quick-question-text">房产朋友圈文案</p>
              </div>
              <div className="quick-question-item" onClick={() => sendQuickQuestion('客户说价格太高了怎么应对？')}>
                <p className="quick-question-text">客户议价应对话术</p>
              </div>
              <div className="quick-question-item" onClick={() => sendQuickQuestion('探盘报告怎么写更专业？')}>
                <p className="quick-question-text">探盘报告模板</p>
              </div>
            </div>
          </div>
        )}

        {/* 正在输入提示 */}
        {isTyping && (
          <div className="message-item message-ai">
            <div className="message-avatar ai">
              🤖
            </div>
            <div className="message-bubble ai-message">
              <p className="typing">正在思考</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入框区域 */}
      <div className="input-bar">
        <div className="input-container">
          <button className="voice-btn" onClick={() => showToast('语音输入功能开发中')}>
            <i className="fa fa-microphone text-lg" />
          </button>
          <input
            type="text"
            className="message-input"
            placeholder="输入你的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="send-btn" onClick={handleSend}>
            <i className="fa fa-paper-plane-o text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Claw;