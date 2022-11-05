const fs = require('fs');
const { codeGenerator } = require("./analyzers");
const { lexicalAnalyze } = require("./analyzers/lexicalAnalyzer");

const globalContext = {
    tokens: [],
    path: '',
    symbolsTable : [[]],
    current: {},
    last: {},
    pos: -1
}


const main = () => {
    fs.writeFileSync("./programs/main.txt", codeGenerator(globalContext));

    // globalContext.path = './programs/main.c';
    // lexicalAnalyze(globalContext);
    // console.log(globalContext.tokens);
};

main();