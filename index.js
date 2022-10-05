const fs = require('fs');
const { codeGenerator } = require("./analyzers");

const globalContext = {
    tokens: [],
    symbolsTable : [[]], // global context
    current: {},
    last: {},
    pos: -1
}


const main = () => {
    fs.writeFileSync("./programs/main.txt", codeGenerator(globalContext));
};

main();