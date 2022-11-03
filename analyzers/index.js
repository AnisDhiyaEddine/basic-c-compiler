const lexicalAnalyzer = require('../Dep/lexicalAnalyzerDep');
const syntaxicalAnalyzer = require('./syntaxicalAnalyzer');
const semanticalAnalyzer = require('./semanticalAnalyzer');
const codeGenerator = require('./codeGenerator');


module.exports = {
    lexicalAnalyzer,
    syntaxicalAnalyzer,
    semanticalAnalyzer,
    codeGenerator,
}