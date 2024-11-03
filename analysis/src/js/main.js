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

async function loadFile(data, content) {
    menuContainer.style.display = 'none';

    console.log(data);

    const text = await new Promise((resolve) => resolve(parseNodeToText(data.ast)));

    contentContainer.innerText = text;
}

function parseNodeToText(ast, tab=0) {
    const tabOffset = (offset) => Array(offset).fill(' ').join('');
    let code = '';
    
    const type = ast.type;
    
    code += type + '(';

    const keys = [];
    for (const key of Object.keys(ast)) {
        if (['type', 'start', 'end'].includes(key)) continue;

        keys.push(key);
    }


    if (keys.length != 0) {
        code += '\n';

        for (const key of keys) {
            const value = ast[key];

            code += tabOffset(tab + 2) + key + ': ';
            
            if (value === null) {
                code += 'null';
            } else if (typeof value === 'string') {
                code += '\'' + value.replaceAll('\'', '\\\'') + '\'';
            } else if (typeof value === 'object') {
                if (typeof value.length !== 'undefined') {
                    code += '[';

                    for (const node of value) {
                        code += '\n'

                        if (node === null) {
                            code += 'null';
                        } else {
                            code += tabOffset(tab + 4) + parseNodeToText(node, tab + 4);
                        }

                        code += ',';
                    }

                    if (value.length !== 0) code += '\n' + tabOffset(tab + 2);

                    code += ']';
                } else {
                    code += parseNodeToText(value, tab + 2);
                }
            } else {
                code += value.toString();
            }

            code += ',\n';
        }

        code += tabOffset(tab);
    }

    code += ')';

    return code;
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