const {lexicalAnalyze, Punctuators} = require('./lexicalAnalyzer');

class Token {
    constructor(type, value = null, position = null, meta = null){
        this.type = type;
        this.value = value;
        this.position = position;
        this.meta = meta;
    }
}

const Types = ["string", "int", "float", "double", "void"]; // simple and double precisions SKIPPED FOR NOW

class Node {
    childsNbr = 0;

    constructor(token = null, child_1 = null, child_2 = null){
        this.token = token;
        this.child_1 = child_1;
        this.child_2 = child_2;
        // Should refactor this portion
        if(child_1) this.childsNbr++;
        if(child_2) this.childsNbr++;
    }

    // Accept two childs by default
    addChild(child){
        this.childsNbr++;
        this[`child_${this.childsNbr}`] = child;
    }
}

const operators = {
    "*": {prio: 6, asso: 1},
    "/": {prio: 6, asso: 1},
    "%": {prio: 6, asso: 1},
    "+": {prio: 5, asso: 1},
    "-": {prio: 5, asso: 1},
    "<=": {prio: 4, asso: 1},
    ">=": {prio: 4, asso: 1},
    "==": {prio: 4, asso: 1},
    "!=": {prio: 4, asso: 1},
    "<": {prio: 4, asso: 1},
    ">": {prio: 4, asso: 1},
    "!": {prio: 4, asso: 1},
    "&&": {prio: 3, asso: 1},
    "||": {prio: 3, asso: 1},
    "=": {prio: 1, asso: 0},
}


const syntaxicalAnalyze = (globalContext) => {
    const next = lexicalAnalyze(globalContext);
    const check = (type) => {
        if(globalContext.current.type == type) {
            next();
            return true;
        }
        return false;
    }

    const checkType = (type) => {
        if (Types.includes(type)){
            next();
            return true;
        }
        return false;
    }

    const accept = (type) => {
        if(!check(type)) {
            throw Error("Invalid type Expected " + type + " got " + globalContext.current.type) + " line: " + globalContext.current.position.line;
        }
    }
    
    const G = () => {
        if(globalContext.tokens.length < 2) return new Node(new Token("eos"));
        let gTree =  F();
        return gTree;
    }

    const F = () => {
        if(checkType(globalContext.current.type)){
            let type = globalContext.last.type;
            let funcIdent = globalContext.current.value;
            let func = new Node(new Token('function', funcIdent), null);
            func.token.meta = {type};
            accept('identifier');
            accept('('); 
            if(check(')')) {
                func.child_2 = I();
                return func;
            }
            let dec = new Node(new Token("decl"));
            do{
                if(!checkType(globalContext.current.type)) throw `Invalid declaration in function " ${funcIdent} ".`;
                type = globalContext.current.last;
                dec.addChild(new Node(new Token('var', globalContext.current.value,
                 globalContext.current.position, {type}))); // for later when I add types
                next();
            } while(check(','));
            accept(')'); 
            func.child_1 = dec;
            func.child_2 = I();
            return func;
        }
    }

    const I = () => {
        if(check("if")){
            accept("(");
            let testNode = E();
            accept(")");
            let thenNode = I();
            if(check("else")){
                let elseNode = I();
                let instrNode = new Node(new Token("ifElse"), testNode, thenNode);
                instrNode.addChild(elseNode);
                return instrNode;
            } 
            return new Node(new Token("if"), testNode, thenNode);
        } else if(check("{")) {
            let blockNode = new Node(new Token("{"));
            while (!check("}")) blockNode.addChild(I());
            check(';');
            return blockNode;
        } else if(check('const') && checkType(globalContext.current.type)){
            let dec = new Node(new Token("decl"));
            let type = globalContext.last.type;
            do{
                dec.addChild(new Node(new Token('const', globalContext.current.value, globalContext.current.position, {type}))); // for later when I add types
                next();
            } while(check(','));
            accept(';');
            return dec;
        } else if(checkType(globalContext.current.type)){
            let dec = new Node(new Token("decl"));
            let type = globalContext.last.type;
            do{
                while(check('*'));
                dec.addChild(new Node(new Token('var', globalContext.current.value, globalContext.current.position, {type}))); // for later when I add types
                next();
            } while(check(','));
            accept(';');
            return dec;
        } else if(check('while')){
            let loopNode = new Node(new Token('loop'));
            accept('(');
            let condNode = new Node(new Token('cond'), E());
            accept(')');
            if(check('{')){
                let blockNode = new Node(new Token("{"));
                while(!check("}")) blockNode.addChild(I());
                check(';');
                condNode.addChild(blockNode)
                condNode.addChild(new Node(new Token('break')));
            } else {
                condNode.addChild(I());
                condNode.addChild(new Node(new Token('break')));
            };
            loopNode.addChild(condNode);
            return loopNode;
        } else if(check('do')){
            let loopNode = new Node(new Token('loop'));
            if(check('{')){
                let blockNode = new Node(new Token("{"));
                while(!check("}")) blockNode.addChild(I());
                check(';');
                loopNode.addChild(blockNode)
            } else {
                loopNode.addChild(I());
            }
            accept('while');
            accept('(');
            let condNode = new Node(new Token('cond'));
            condNode.addChild(E());
            condNode.addChild(new Node(new Token('break')));
            loopNode.addChild(condNode);
            accept(')');
            accept(';');
            return loopNode;

        } else if(check('for')){
            let loopNode = new Node(new Token('loop'));
            let seqNode = new Node(new Token('seq'));
            let condNode = new Node(new Token('cond'));
            accept('(');
            seqNode.addChild(E());
            accept(';');
            condNode.addChild(E());
            accept(';');
            loopNode.addChild(E());
            accept(')');
            if(check('{')) {
                let blockNode = new Node(new Token("{"));
                while(!check("}")) blockNode.addChild(I());
                check(';');
                loopNode.addChild(blockNode)
                condNode.addChild(new Node(new Token('break')));
                loopNode.addChild(condNode)
            }
            seqNode.addChild(loopNode);
            return seqNode;
        } else if(check('return')){
            let expNode = E();
            accept(';');
            return new Node(new Token('return'), expNode);
        } else if(check("__send__")){
            accept("(");
            check("\"");
            let expNode = E();
            check("\"");
            accept(')');
            accept(';');
            return new Node(new Token('__send__'), expNode);
        } else {
            let expNode = E();
            accept(';');
            return new Node(new Token('drop'), expNode);
        }; 
    }

    const E = (pMin = 0) => {
        let A1 = P();    
        let A2, op;
        while(operators[globalContext.current.type]){
            op = globalContext.current;
            if(operators[op.type].prio >= pMin ){
                next();
                A2 = E(operators[op.type].prio + operators[op.type].asso);
                A1 = new Node(op, A1, A2);
            } else {
                break;
            }
        }
        return A1;
    }

    const P = () => {
        if(check('-') || check('+') || check('!')){
            return  new Node(globalContext.last, P());
        } else if(check('*')){
            return  new Node(new Token('point'), P());
        } else if(check('&')){
            return  new Node(new Token('adr'), P());
        } else {
            return S();
        }
    }

    const S = () => {
        let node = A();
        let exp;
        while(check('[')){
            exp = E();
            accept(']');
            node = new Node(new Token('point'), new Node(new Token('+'), node, exp));
        }
        return node;
    }

    const A = () => {
        let exp;
        if (check('(')){
            exp = E();
            accept(')');
            return exp;
        } else if (check('const')) {
            if(globalContext.last.value) {
                return new Node(globalContext.last);
            }
            next();
            return new Node(globalContext.last, A());
        } else if (check('identifier')) { 
            let ident = globalContext.last.value;
            if(check('(')){
                let callNode = new Node(new Token('call', ident));
                while(!check(')')){
                    callNode.addChild(E());
                    check(','); // Check or accept :)
                }
                return  callNode;
            }
            return new Node(globalContext.last);
        } else {
            next();
            return new Node(globalContext.last, A());
        }
    }  

    return G();
}

module.exports = {syntaxicalAnalyze, Punctuators};