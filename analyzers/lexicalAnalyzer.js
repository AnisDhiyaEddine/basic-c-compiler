
const fs = require('fs');

const Punctuators = {
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
    eos: 'eos',
    __send__: '__send__',
}

const isNumber = (str) => {
    if (parseInt(str) >= 0) return `${parseInt(str)}` === str;
    return false;
}

const isKeyword = (str) => {
    if (Keywords[str]) return true;
    return false;
}

const isPunctuator = (str) => {
    if (Punctuators[str]) return true;
    return false;
}

const tokenize = ({line, index}) => {
    const tokens = [];
    let acc;
    let i = 0;
    while (i < line.length) {
        acc = '';
        while (line[i] != ' ' && !isPunctuator(line[i]) && !isPunctuator(line[i] + line[i + 1]) && i < line.length) {
            if (line[i] == '"') {
                acc = '"';
                i++;
                while (line[i] != '"') {
                    acc += line[i]
                    i++;
                };
                acc += line[i]
                i++;
            } else {
                acc += line[i];
                i++;
            }
        }

        if (line[i] == ' ') i++;
        if (isKeyword(acc)) {
            tokens.push(new Token(acc, '', {line: index}));
        } else if (isNumber(acc)) {
            tokens.push(new Token('const', acc, {line: index}));
        } else if (acc[0] == '"' && acc[acc.length - 1] == '"') {
            tokens.push(new Token('const', acc, {line: index}));
        } else {
            if (acc) tokens.push(new Token('identifier', acc, { line: index }));
        }
        
        if (isPunctuator(line[i] + line[i + 1])) {
            tokens.push(new Token(line[i]+line[i + 1], '', {line: index}));
            i += 2;
            continue;
        }

        if (isPunctuator(line[i])) {
            tokens.push(new Token(line[i], '', {line: index}));
            i++;
            continue;
        }
    }
    return tokens;
}

class Token {
    constructor(type, value = null, position = null){
        this.type = type;
        this.value = value;
        this.position = position;
    }
}


const lexicalAnalyze = (globalContext) => { 
    const code = fs.readFileSync(globalContext.path, { encoding: 'utf8', flag: 'r' });
    const getTokens = () => {
        let lines = code.split("\n").map(line => line.trim());
        let index = 0;
        lines = lines.map(line => {
            index++;
            line = line.split("#")[0];
            line = line.split("//")[0];
            return { line, index };
        }).filter(({ line }) => line != '');

        const tokens = [];
        lines.map(tokenize).forEach(line => line.forEach(token => tokens.push(token)));
        return [...tokens, new Token('eos')];

    }

    globalContext.tokens = getTokens();
    const next = () => {
        globalContext.last = globalContext.current;
        globalContext.pos++;
        globalContext.current = globalContext.tokens[globalContext.pos];

    };

    if(! Object.keys(globalContext.current).length) {
        next();
    }
    return next;
}

module.exports = {lexicalAnalyze, Punctuators};