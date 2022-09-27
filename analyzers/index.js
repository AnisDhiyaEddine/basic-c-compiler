const lexicalAnalyzer = require('./lexicalAnalyzer');
const syntaxicalAnalyzer = require('./syntaxicalAnalyzer');
const semanticalAnalyzer = require('./semanticalAnalyzer');
const codeGenerator = require('./codeGenerator');


module.exports = {
    lexicalAnalyzer,
    syntaxicalAnalyzer,
    semanticalAnalyzer,
    codeGenerator,
}