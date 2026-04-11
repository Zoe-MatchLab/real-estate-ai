/**
 * 房产AI作业平台 V3.0 — 第4轮兼容性测试（简化版）
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = '/Users/zhaoguangxu/openclaw/workspace/projects/real-estate-ai';
const REPORT_PATH = path.join(BASE, 'docs/产品设计/PRD-V3.0/测试报告-第4轮.md');

const VIEWPORTS = [
  { name: 'Desktop HD', w: 1920, h: 1080 },
  { name: 'Desktop', w: 1280, h: 800 },
  { name: 'Tablet', w: 768, h: 1024 },
];

async function runTests() {
  const results = { viewports: [] };
  const browser = await chromium.launch({ headless: true, timeout: 30000 });

  for (const vp of VIEWPORTS) {
    console.log(`测试 ${vp.name} (${vp.w}x${vp.h})`);
    const vpResult = { name: vp.name, pages: [] };

    try {
      const page = await browser.newPage();
      await page.setViewportSize({ width: vp.w, height: vp.h });
      await page.goto(`file://${BASE}/pc/pages/v3/task/task-list.html`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(300);

      const loaded = await page.locator('body').count() > 0;
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const overflow = bodyWidth > vp.w + 50;

      vpResult.pages.push({
        name: '任务列表',
        loaded,
        overflow,
        detail: overflow ? `水平溢出${bodyWidth - vp.w}px` : '布局正常'
      });

      await page.close();
    } catch (err) {
      vpResult.error = err.message;
    }

    results.viewports.push(vpResult);
  }

  await browser.close();

  const report = `# 房产AI作业平台 V3.0 — 测试报告（第4轮：兼容性测试）

> **测试日期：** ${new Date().toISOString().split('T')[0]}
> **测试工具：** Playwright
> **测试类型：** 多分辨率兼容性

## 一、多分辨率测试

| 分辨率 | 尺寸 | 加载 | 布局 | 状态 |
|--------|------|------|------|------|
${results.viewports.map(vp => {
  const p = vp.pages[0] || {};
  const status = vp.error ? '❌' : p.overflow ? '⚠️' : '✅';
  return `| ${vp.name} | ${vp.w}×${vp.h} | ${p.loaded ? '✅' : '❌'} | ${p.overflow ? '⚠️溢出' : '✅正常'} | ${status} |`;
}).join('\n')}

## 二、测试结论

${results.viewports.map(vp => {
  const p = vp.pages[0];
  if (vp.error) return `- **${vp.name}**：加载失败 - ${vp.error}`;
  if (p.overflow) return `- **${vp.name}**：存在布局溢出问题，建议优化`;
  return `- **${vp.name}**：✅ 正常`;
}).join('\n')}

---

*报告生成时间：${new Date().toLocaleString('zh-CN')}*
`;

  fs.writeFileSync(REPORT_PATH, report, 'utf-8');
  console.log(`报告已生成: ${REPORT_PATH}`);
  return results;
}

runTests().catch(err => {
  console.error('测试失败:', err);
  process.exit(1);
});
