// Import required modules
const fs = require('fs').promises;
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

// Configuration
const sourceDir = '../src/js';

async function getFilesFromDirectory(dir, ext='.js') {
    dir = dir.replace(/\/$/, '').replace(/^\//, ''); // trim additional slashes

    const files = [];

    const items = await fs.readdir(dir);
    for (const item of items) {
        const itemPath = dir + '/' + item;
        const isDirectory = (await fs.lstat(itemPath)).isDirectory();

        if (isDirectory) {
            const directoryFiles = await getFilesFromDirectory(itemPath, ext);
            files.push(...directoryFiles);
        } else if (path.extname(item) == ext) {
            files.push(itemPath);
        }
    }

    return files;
}

async function analyzeFile(filePath) {
    const code = await fs.readFile(filePath, 'utf-8');
    const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 2024 });

    const analysis = {
        file: filePath,
        ast: ast
    };

    // // Traverse AST to find functions and global variables
    // walk.simple(ast, {
    //     FunctionDeclaration(node) {
    //         analysis.functions.push({
    //         name: node.id.name,
    //         start: node.start,
    //         end: node.end,
    //         dependencies: [] // Fill in dependencies for each function
    //         });
    //     },
    //     Identifier(node) {
    //         // Assume a simple global variable heuristic here
    //         if (node.name.toUpperCase() === node.name) { // Assuming globals are all caps
    //             analysis.globals.add(node.name);
    //         }
    //     }
    // });

    // analysis.globals = Array.from(analysis.globals); // Convert Set to Array

    return analysis;
}

(async function() {
    const files = await getFilesFromDirectory(sourceDir, '.js');
    const results = [];

    for (const file of files) {
        const analysis = await analyzeFile(file);
        results.push(analysis);
    }

    await fs.writeFile('./analysis.min.json', JSON.stringify(results));
    await fs.writeFile('./analysis.json', JSON.stringify(results, null, 2));
    console.log('Codebase analysis saved to analysis.json');
})();


// // Utility to read all JS files in a directory
// const getJavaScriptFiles = (dir) => {
//   return fs.readdirSync(dir)
//     .filter(file => path.extname(file) === '.js')
//     .map(file => path.join(dir, file));
// };

// // Parse file and extract functions, globals, and dependencies
// const analyzeFile = (filePath) => {
//   const code = fs.readFileSync(filePath, 'utf-8');
//   const ast = acorn.parse(code, { ecmaVersion: 2020 });

//   const analysis = {
//     file: filePath,
//     functions: [],
//     globals: new Set()
//   };

//   // Traverse AST to find functions and global variables
//   walk.simple(ast, {
//     FunctionDeclaration(node) {
//       analysis.functions.push({
//         name: node.id.name,
//         start: node.start,
//         end: node.end,
//         dependencies: [] // Fill in dependencies for each function
//       });
//     },
//     Identifier(node) {
//       // Assume a simple global variable heuristic here
//       if (node.name.toUpperCase() === node.name) { // Assuming globals are all caps
//         analysis.globals.add(node.name);
//       }
//     }
//   });

//   analysis.globals = Array.from(analysis.globals); // Convert Set to Array
//   return analysis;
// };

// // Aggregate results from all files
// const analyzeCodebase = () => {
//   const files = getJavaScriptFiles(sourceDir);
//   const results = files.map(analyzeFile);

//   fs.writeFileSync('./analysis.json', JSON.stringify(results, null, 2));
//   console.log('Codebase analysis saved to analysis.json');
// };

// // Run analysis
// analyzeCodebase();
