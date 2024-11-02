const menuContainer = document.querySelector('#menu');
const contentContainer = document.querySelector('#content');

(async function() {
    const request = await fetch('/analysis/analysis.json');
    const data = await request.json();

    menuContainer.innerHTML = '';

    for (const fileData of data) {
        const file = fileData.file;

        const a = document.createElement('a');
        a.setAttribute('href', '');
        a.innerText = file;

        a.addEventListener('click', async function(e) {
            e.preventDefault();

            const fileRequest = await fetch(file);
            const fileContent = await fileRequest.text();

            loadFile(fileData, fileContent);
        });

        menuContainer.appendChild(a);
    }
})();

function loadFile(data, content) {
    menuContainer.style.display = 'none';

    const xml = parseNodeToXML(data.ast);

    contentContainer.innerText = xml;
}

function parseNodeToXML(ast, tab=0) {
    let xml = '';
    let tabOffset = '';

    const type = ast.type;
    const start = ast.start;
    const end = ast.end;

    for (let i = 0; i < tab; i++) tabOffset += ' ';

    xml += tabOffset;
    xml += `<${type} start="${start}" end="${end}">`;
    
    if (typeof ast.body !== 'undefined') {
        xml += '\n';

        const nodes = typeof ast.body.length != 'undefined' ? ast.body : [ast.body];
        for (const node of nodes) {
            xml += parseNodeToXML(node, tab + 2);
            xml += '\n';
        }

        xml += tabOffset;
    }

    xml += `</${type}>`;

    return xml;
}