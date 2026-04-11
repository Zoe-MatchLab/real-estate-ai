const { runRound5Tests } = require('./round5-security.js');
const fs = require('fs');
const path = require('path');

async function main() {
    console.log('开始执行第5轮安全测试...\n');
    
    const results = await runRound5Tests();
    
    const passRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    
    let report = `# 测试报告 第5轮 - 安全测试

> **测试时间**：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}  
> **测试类型**：安全测试（XSS、权限控制等）  
> **测试环境**：Playwright (Chromium)  
> **基础URL**：http://localhost:3001

---

## 测试结果汇总

| 指标 | 数值 |
|------|------|
| 测试用例数 | ${results.passed + results.failed + results.warnings} |
| 通过 | ${results.passed} |
| 失败 | ${results.failed} |
| 警告 | ${results.warnings} |
| 通过率 | ${passRate}% |

---

## 安全测试详情

### XSS防护测试

`;

    const xssTests = results.tests.filter(t => t.category === 'XSS防护');
    xssTests.forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `#### ${statusIcon} ${test.id}: ${test.page}

- **测试项**：${test.issue}
- **状态**：${test.status}
- **说明**：${test.details}

`;
    });

    report += `### 权限控制测试

`;

    const permTests = results.tests.filter(t => t.category === '权限控制');
    permTests.forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `#### ${statusIcon} ${test.id}: ${test.page}

- **测试项**：${test.issue}
- **状态**：${test.status}
- **说明**：${test.details}

`;
    });

    report += `### 敏感信息与注入测试

`;

    const otherTests = results.tests.filter(t => 
        t.category !== 'XSS防护' && t.category !== '权限控制'
    );
    otherTests.forEach(test => {
        const statusIcon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        report += `#### ${statusIcon} ${test.id}: ${test.page}

- **分类**：${test.category}
- **测试项**：${test.issue}
- **状态**：${test.status}
- **说明**：${test.details}

`;
    });

    report += `---

## 安全问题汇总

`;

    const secIssues = results.tests.filter(t => t.status === 'FAILED');
    const secWarnings = results.tests.filter(t => t.status === 'WARNING');
    
    if (secIssues.length === 0) {
        report += `**未发现高危安全问题**。`;
    } else {
        report += `**发现${secIssues.length}个安全问题需要修复**：\n\n`;
        secIssues.forEach(t => {
            report += `| ${t.id} | ${t.issue} | ${t.details} |\n`;
        });
    }

    if (secWarnings.length > 0) {
        report += `\n**${secWarnings.length}个安全建议**：\n`;
        secWarnings.forEach(t => {
            report += `- ${t.id}: ${t.details}\n`;
        });
    }

    report += `

---

## 结论

第5轮安全测试通过率${passRate}%。

`;

    if (secIssues.length === 0) {
        report += `**安全状况良好**，未发现高危XSS或注入漏洞。\n\n`;
    } else {
        report += `**存在${secIssues.length}个安全问题需要立即修复**：\n`;
        secIssues.forEach(t => {
            report += `1. ${t.issue}\n`;
        });
        report += `\n`;
    }

    report += `**后续建议**：
1. 后端实现时需添加完整的权限验证
2. 所有用户输入需进行服务端验证
3. 敏感操作需添加审计日志
4. 生产环境需配置HTTPS和安全的CORS策略

---

*报告生成时间：${new Date().toISOString()}*
`;

    const reportPath = path.join(__dirname, '..', 'docs', '产品设计', 'PRD-V2.0', '测试报告-第5轮.md');
    fs.writeFileSync(reportPath, report);
    
    console.log('\n=== 测试结果汇总 ===');
    console.log(`通过: ${results.passed}`);
    console.log(`失败: ${results.failed}`);
    console.log(`警告: ${results.warnings}`);
    console.log(`\n报告已生成: ${reportPath}`);
}

main().catch(console.error);
