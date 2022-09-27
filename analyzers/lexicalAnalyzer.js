const TokenTypes = {
    return: 'return',
    int: 'int',
    double: 'double',
    float: 'float',
    const: 'const',
    if: 'if',
    else: 'else',
    switch: 'switch',
    for: 'for',
    while: 'while',
    do: 'do',
    break: 'break',
    continue: 'continue', 
    printf: 'printf',
    scanf: 'scanf',
    id: "id",
    eos: 'eos',
    "\"": "\"",
    "\'": "\'",
    "+": "+",
    "-": "-",
    "/": "/",
    "*": "*",
    ">=": ">=",
    "==": "==",
    "<=": "<=",
    "!=": "!=",
    "%": "%",
    "&&": "&&",
    "||": "||",
    "<": "<",
    ">": ">",
    "=": "=",
    "(": "(",
    ")": ")",
    "[": "[",
    "]": "]",
    "{": "{",
    "}": "}",
    "!": "!",
    "&": "&",
    ",": ",",
    ";": ";"
}

const Types = ["string", "int", "float", "double"]; // simple and double precisions SKIPPED FOR NOW

class Token {
    constructor(type, value = null, position = null){
        this.type = type;
        this.value = value;
        this.position = position;
    }
}

const idGen = {
    id: 0,
    mem : {},
    getId(entry){
        if(idGen.mem[entry]) return idGen.mem[entry];
        idGen.id++;
        idGen.mem[entry] = idGen.id;
        return idGen.id;
    },
}

const tokenize = ({word, index}) => {
    let wordPieces = []
    let tokens = []

    if(typeof(word) == 'string'){
        word = word.replace(/\s/g, '');
        let matchedType = '';
        while(word){
            let typeIndex = word.length;
            for(type in TokenTypes){
                if(word.indexOf(type) < typeIndex && word.indexOf(type) >= 0)  {
                    typeIndex = word.indexOf(type);
                    matchedType = type;
                }
            }
    
            if( typeIndex > 0 ) {
                wordPieces.push(word.substring(0, typeIndex));
                word = word.substring(typeIndex)
            } else {
                wordPieces.push(word.substring(0, matchedType.length));
                word = word.substring(matchedType.length)
            }
        }

        tokens = wordPieces.map(word => {
            if(TokenTypes[word]) return new Token(word, '', {line: index});
            if(parseFloat(word) || parseInt(word)) return new Token("const", word, { line: index });
            return new Token("identifier", word, { line: index });
        });

    } else {
        tokens = [word];
    }   
    
    return tokens
}

const lexicalAnalyzer = (code, globalContext) => { 
    
    const getTokens = () => {
        const tokens = [];
        let lines = code.split("\n").map(line => line.trim());
        let index = 0;
        lines = lines.map(line => {
            index++;
            line = line.split("#")[0];
            line = line.split("//")[0];
            return { line, index };
        }).filter(({line}) => line != '');

        let words = [];
        let match = "";
        lines.forEach(({ line, index}) => {
            match = line.match(/(?<=").*(?=")/g);
            match = match ? match[0] : match;
            if(match){
                let value = line.substring(line.indexOf(match), 
                line.indexOf(match) + match.length);
                words.push({word: line.substring(0, line.indexOf(match)), index},
                { word: new Token("const", value, {line: index})},
                { word: line.substring(line.indexOf(match) + match.length), index});
            } else {
                words.push({word: line, index});
            }
        })

        words = words.map(word => tokenize(word))
        words.forEach(word => {
            word.forEach(token => tokens.push(token))
        })

        return [...tokens, new Token("eos")];
    }

    globalContext.tokens = getTokens();

    const next = () => {
        globalContext.last = globalContext.current;
        globalContext.pos++;
        if(globalContext.pos == globalContext.tokens.length){
            globalContext.current = new Token("eos", TokenTypes["eos"], {})
        } else if((globalContext.pos > globalContext.tokens.length)){
            return;
           // throw new Error("You've already reached the end of file");
        } else {
            globalContext.current = globalContext.tokens[globalContext.pos];
        }
    };

    next(); // Initialize the context
    return next;
}

module.exports = lexicalAnalyzer;