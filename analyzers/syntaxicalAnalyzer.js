
// Should refactor 
class Token {
    constructor(type, value = null, position = null, meta = null){
        this.type = type;
        this.value = value;
        this.position = position;
        this.meta = meta;
    }
}

const Types = ["string", "int", "float", "double"]; // simple and double precisions SKIPPED FOR NOW

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


const syntaxicalAnalyzer = (next, globalContext) => {
    const check = (type) => {
        if(globalContext.current.type == type) {
            next();
            return true;
        }
        return false;
    }

    const accept = (type) => {
        if(!check(type)) {
            throw Error("Invalid type Expected " + type + " got " + globalContext.current.type);
        }
    }
    
    const G = () => {
        if(globalContext.tokens.length < 2) return new Node(new Token("eos"));
        let gTree =  F();
        accept("eos");
        return gTree;
    }

    const F = () => {
        return I();
    }

    const I = () => {
        if(check("if")){
            accept("(");
            let testNode = new Node(new Token("drop"), E());
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
            while(!check("}")) blockNode.addChild(I());
            return blockNode;
        } else if(check('const') && Types.includes(globalContext.current.type)){
            next();
            let dec = new Node(new Token("decl"));
            let type = globalContext.last.type;
            do{
                dec.addChild(new Node(new Token('const', globalContext.current.value, globalContext.current.position, {type}))); // for later when I add types
                next();
            } while(check(','));
            accept(';');
            return dec;
        } else if(Types.includes(globalContext.current.type)){
            next();
            let dec = new Node(new Token("decl"));
            let type = globalContext.last.type;
            do{
                dec.addChild(new Node(new Token('var', globalContext.current.value, globalContext.current.position, {type}))); // for later when I add types
                next();
            } while(check(','));
            accept(';');
            return dec;
        } else {
            let expNode = E();
            accept(';');
            return expNode;
        }
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
        } else {
            return S();
        }
    }

    const S = () => {
        return A();
    }

    const A = () => {
        let exp;
        if(check('(')){
            exp = E();
            accept(')');
            return exp;
        } else if (check('const')) {
            if(globalContext.last.value) return new Node(globalContext.last);
            next();
            return new Node(globalContext.last, A());
        } else if(check('identifier')) { 
            return new Node(globalContext.last);
        } else { // type 
            next();
             return new Node(globalContext.last, A());
        }
    }  

    return G();
}


module.exports = syntaxicalAnalyzer;