
const fs = require('fs');

const Operators = {
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
    "[": "[",
    "]": "]",
    "!": "!",
    "&": "&",
    ",": ",",
    ";": ";"
}

const Keywords = {
    return: 'return',
    int: 'int',
    void: 'void',
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
    id: "id",
    eos: 'eos',
    printf: '',
    __send__: '__send__',
}

const TokenTypes = {
    ...Operators,
    ...Keywords
}

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
            if(parseFloat(word) || parseInt(word) || word == 0) return new Token("const", word, { line: index });
            return new Token("identifier", word, { line: index });
        });

    } else {
        tokens = [word];
    }   
    
    return tokens
}

const lexicalAnalyze = (globalContext) => { 
    const code = fs.readFileSync(globalContext.path, {encoding:'utf8', flag:'r'});
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

        // // handle xxTypexx && xxType declarations
        let tempTokens = [];
        for(let i=0; i < tokens.length; i++){
            if(tokens[i]?.type == 'identifier' && Keywords[tokens[i + 1].type] && tokens[i + 2]?.type == 'identifier'){
                tokens[i].value += tokens[i + 1]?.type + tokens[i + 2]?.value;
                tempTokens.push(tokens[i]);
                i+= 2;
            } else if(tokens[i]?.type == 'identifier' && Keywords[tokens[i + 1]?.type] ){
                tokens[i].value += tokens[i + 1].type;
                tempTokens.push(tokens[i]);
                i+=1;
            } else {
                tempTokens.push(tokens[i]);
            }
        }
        return [...tempTokens, new Token('eos')];
    }


    globalContext.tokens = getTokens();

    const next = () => {
        globalContext.last = globalContext.current;
        globalContext.pos++;
        globalContext.current = globalContext.tokens[globalContext.pos];

    };

    if(! Object.keys(globalContext.current).length) {
        next(); // Initialize the context
    }
    return next;
}

module.exports = lexicalAnalyze;