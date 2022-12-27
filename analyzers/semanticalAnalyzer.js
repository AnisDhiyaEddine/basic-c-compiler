const {syntaxicalAnalyze, Punctuators} = require('./syntaxicalAnalyzer');

class semanticalAnalyzer {
    numVars = 0;

    /**
     * @param identifier {id: criteria of comparaison with symbols table content, ...}
     * @returns identifier passed in param in case of success
     */
    declare(identifier, globalContext){
        globalContext.symbolsTable[globalContext.symbolsTable.length - 1].forEach(({id}) => {
            if(id == identifier.id){
                throw `Symbol ${identifier.id} redeclared`;
            }
        });
        globalContext.symbolsTable[globalContext.symbolsTable.length - 1]?.push(identifier);
        return identifier;
    }

    /**
     * @param identifier {id: criteria of comparaison with symbols table content, ...}
     * @returns identifier passed in param in case of success
     */
    find(identifier, globalContext){
        let idFound = null;
        for(let blocIndex=0; blocIndex <globalContext.symbolsTable.length; blocIndex++){
           globalContext.symbolsTable[blocIndex].forEach((id) => {
                if(id.id == identifier.id) { 
                    idFound = id;
                };
            })
        };

        if(idFound) return idFound;
        throw `Symbol " ${identifier.id} " is not declared.`
    }

    blocStart(globalContext){
       globalContext.symbolsTable.push([]);
    }

    blocEnd(globalContext){
       globalContext.symbolsTable.pop();
    }

    // From now I won't support types [ToBeChecked LATER]
    semanticalAnalyze(node, globalContext){
        switch(node.token.type){
            case '{':
                this.blocStart(globalContext);
                for(let i = 1; i <= node.childsNbr; i++){
                    this.semanticalAnalyze(node[`child_${i}`], globalContext);
                }
                this.blocEnd(globalContext);
                node.numVars = this.numVars;
            break;
            case 'decl':
                for(let i = 1; i <= node.childsNbr; i++){
                    if (node[`child_${i}`]) {
                        if (parseInt(node[`child_${i}`].token.value[0]) >= 0)
                            throw `Invalid variable name [ ${node[`child_${i}`].token.value} ] line: ${node[`child_${i}`].token.position.line}`;
                        this.declare({id: node[`child_${i}`].token.value,
                        type: node[`child_${i}`].token.type,
                        meta: node[`child_${i}`].token.meta,
                        adr: this.numVars}, globalContext);
                        node[`child_${i}`].adr = this.numVars;
                        this.numVars++;
                    }   
                }
            break;
            case 'const':
            case 'var': 
            break;
            case '=': 
                let valid = ['var', 'point', 'adr'];
                if(node.childsNbr < 2) throw 'Invalid assignation on line: ' + node.token.position.line;
                this.semanticalAnalyze(node.child_1, globalContext);
                this.semanticalAnalyze(node.child_2, globalContext);
                if (!valid.includes(node.child_1.token.type)) {
                    throw "Invalid assignation";
                }
            break;
            case 'identifier':
                node.token.adr = this.find({id: node.token.value}, globalContext).adr;
                node.token.type = this.find({id: node.token.value}, globalContext).type;
                node.token.meta = this.find({ id: node.token.value }, globalContext).meta;
                if (node.token.type == 'function') throw `Invalid function call: ${node.token.value} on line ${node.token.position.line}`;
            break;
            case 'function': 
                this.declare({ id: node.token.value, type: 'function', argsNum: node?.child_1?.childsNbr || 0 }, globalContext);
                if(node.child_1) this.semanticalAnalyze(node.child_1, globalContext);
                this.semanticalAnalyze(node.child_2, globalContext);
                if(node.child_1){
                    node.numVars = this.numVars - node.child_1.childsNbr;
                } else {
                    node.numVars = this.numVars;
                }
            break;
            case 'call': 
                if(this.find({id: node.token.value}, globalContext).type != 'function' ){
                    throw `No function is defined with the name " ${node.token.value} "`;
                }
                for(let i = 1; i <= node.childsNbr; i++){
                    this.semanticalAnalyze(node[`child_${i}`], globalContext);
                }
                if (this.find({ id: node.token.value }, globalContext).argsNum != node.childsNbr)
                    throw `Invalid function call [ ${node.token.value} found ${node.childsNbr} instead of ${this.find({ id: node.token.value }, globalContext).argsNum} arg]`;
                break;
            case 'adr': 
                if((this.find({id: node.child_1.token.value}, globalContext)).type != 'var') throw 'Invalid refrence';
                node.numVar = this.find({id: node.child_1.token.value}, globalContext).adr
            break;
            case 'point': 
                this.semanticalAnalyze(node.child_1, globalContext);
                break;
            
            default: 
                for(let i = 1; i <= node.childsNbr; i++){
                    this.semanticalAnalyze(node[`child_${i}`], globalContext);
                }
            break;
        }
        return node;
    }
};

const semanticalAnalyze = (globalContext) => {
    const analyzer = new semanticalAnalyzer();
    return analyzer.semanticalAnalyze(syntaxicalAnalyze(globalContext), globalContext);
}

module.exports = semanticalAnalyze;