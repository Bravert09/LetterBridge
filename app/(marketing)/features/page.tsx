// 1. 定义数据结构（放在组件外，清晰且无重复定义报错）
const STRATEGY_DATA = {
  features: [
    {
      title: "语篇为王",
      color: "border-blue-500",
      iconColor: "text-blue-600",
      content: "靠逻辑关系（因果/转折）、时态人称、指代关系判断。",
      svgPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
      title: "卡在细节",
      color: "border-orange-500",
      iconColor: "text-orange-600",
      content: "核心词的一词多义、易混辨析、词性变化（decide → decision）。",
      svgPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    },
    {
      title: "固定考位",
      color: "border-green-500",
      iconColor: "text-green-600",
      content: "开头设背景名词，中间考逻辑词，结尾考情感总结词。",
      svgPath: "M5 13l4 4L19 7"
    }
  ],
  steps: [
    {
      id: "Step 1",
      title: "通读全文：不看首字母",
      task: "确定题材与作者态度",
      details: ["文章在讲什么？", "记叙/说明/议论文？", "态度：积极/消极/中性？"],
      warning: "禁忌：第一遍就开始盯着空填词，高失误率操作！"
    },
    {
      id: "Step 2",
      title: "句法定位：三问法则",
      task: "看首字母 + 句法拆解",
      details: ["缺什么词性？(名/动/形)", "时态是什么？(前后一致/时间状语)", "首字母限制？(s____ -> say/seem?)"]
    },
    {
      id: "Step 3",
      title: "逻辑核查：自然度测试",
      task: "模拟写作核对",
      details: ["如果这是我写的英语作文，这句话自然吗？", "不自然 = 大概率错。"]
    }
  ]
};

export default function FeaturesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12 bg-white">
      {/* 标题区 */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">上海中考首字母填空提分攻略</h1>
        <p className="text-slate-500 text-lg">还原真实考场逻辑，突破 80% 核心词卡点</p>
      </header>

      {/* 第一部分：考点特征卡片 (平铺展示) */}
      <section className="grid md:grid-cols-3 gap-6">
        {STRATEGY_DATA.features.map((feature, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border-t-4 shadow-sm bg-slate-50 ${feature.color}`}>
            <div className={`flex items-center mb-3 font-bold ${feature.iconColor}`}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.svgPath}></path>
              </svg>
              {feature.title}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{feature.content}</p>
          </div>
        ))}
      </section>

      {/* 第二部分：标准流程 (平铺长列表展示) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center border-l-4 border-slate-800 pl-4">
          做题“标准流程”
        </h2>

        <div className="space-y-4">
          {STRATEGY_DATA.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {step.id}
                </span>
                <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-blue-700 font-semibold mb-3">核心任务：{step.task}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center text-slate-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 shadow-sm"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {step.warning && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 self-center">
                    <p className="text-red-700 text-sm font-medium flex items-start">
                      <span className="mr-2 italic font-bold">⚠️ </span>
                      {step.warning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 底部引导 */}
      <footer className="pt-8 text-center">
        <p className="text-slate-400 text-sm italic">—— 严格执行流程，是跨越 10 分门槛的唯一途径 ——</p>
      </footer>
    </div>
  );
}

