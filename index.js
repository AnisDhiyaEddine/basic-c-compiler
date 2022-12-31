const fs = require('fs');
const { codeGenerator } = require("./analyzers");

const globalContext = {
    tokens: [],
    path: '',
    symbolsTable : [[]],
    current: {},
    last: {},
    pos: -1
}


const main = () => {
    // node index -f <path> -o <path>
    const args = process.argv.slice(2);
    const path = args[1];
    const outPath = args[3];

    if (!path) {
        console.log('No source path provided');
        return;
    } else if (!outPath) {
        console.log('No output path provided');
        return;
    }


    fs.writeFileSync(outPath, codeGenerator(globalContext, path));
    console.log('compiled successfully to ' + outPath);
};

main();