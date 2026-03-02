const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const files = [
    { path: '/Users/yamamuratakuya/Documents/生成AIパスポート試験/seisei-ai-pasport-lesson-site/chapter3/3-1_services.html', section: '3-1' },
    { path: '/Users/yamamuratakuya/Documents/生成AIパスポート試験/seisei-ai-pasport-lesson-site/chapter3/3-2_deepfake.html', section: '3-2' },
    { path: '/Users/yamamuratakuya/Documents/生成AIパスポート試験/seisei-ai-pasport-lesson-site/chapter3/3-3_rag.html', section: '3-3' },
    { path: '/Users/yamamuratakuya/Documents/生成AIパスポート試験/seisei-ai-pasport-lesson-site/chapter3/3-4_agent.html', section: '3-4' }
];

let allData = [];

files.forEach(({path, section}) => {
    const html = fs.readFileSync(path, 'utf8');
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const questions = document.querySelectorAll('.quiz-question');
    
    questions.forEach((qEl) => {
        const qText = qEl.querySelector('p').textContent.replace(/^問題\d+:\s*/, '').trim();
        const optionEls = qEl.querySelectorAll('.quiz-options li');
        let options = [];
        let answerIndex = -1;
        let explanation = "";
        
        optionEls.forEach((optEl, i) => {
            options.push(optEl.textContent.trim());
            const onclick = optEl.getAttribute('onclick');
            if (onclick && onclick.includes('true')) {
                answerIndex = i;
                // Extract explanation: selectAnswer(this, true, '✅ 解説：...')
                const match = onclick.match(/true,\s*'([^']+)'/);
                if (match) {
                    explanation = match[1];
                }
            }
        });
        
        allData.push({
            q: qText,
            options: options,
            answer: answerIndex,
            explanation: explanation,
            section: section
        });
    });
});

fs.writeFileSync('questions.json', JSON.stringify(allData, null, 2));
console.log('Saved to questions.json');
