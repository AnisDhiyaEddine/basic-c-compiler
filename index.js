const fs = require('fs');
const { lexicalAnalyzer, syntaxicalAnalyzer, semanticalAnalyzer, codeGenerator } = require("./analyzers");

const globalContext = {
    tokens: [],
    current: {},
    last: {},
    pos: -1
}


const main = () => {
    const code = fs.readFileSync('programs/main.c', {encoding:'utf8', flag:'r'});
    const next = lexicalAnalyzer(code, globalContext);
    //  console.log(globalContext.tokens)
    const synTree = syntaxicalAnalyzer(next, globalContext);
    const semTree = semanticalAnalyzer(synTree, globalContext);
    // fs.writeFileSync("./programs/main.txt", JSON.stringify(semTree));
    fs.writeFileSync("./programs/main.txt", codeGenerator(semTree, globalContext));
};

main();