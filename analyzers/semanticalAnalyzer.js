class semanticalAnalyzer {
    symbolsTable = []; // default bloc
    idNum = 0;

    /**
     * @param identifier {id: criteria of comparaison with symbols table content, ...}
     * @returns identifier passed in param in case of success
     */
    declare(identifier){
        this.symbolsTable[this.symbolsTable.length - 1].forEach(({id}) => {
            if(id == identifier.id){
                throw `variable ${identifier.id} redeclared`;
            }
        });
        this.symbolsTable[this.symbolsTable.length - 1]?.push(identifier);
        return identifier;
    }

    /**
     * @param identifier {id: criteria of comparaison with symbols table content, ...}
     * @returns identifier passed in param in case of success
     */
    find(identifier){
        let idFound = null;
        for(let blocIndex=0; blocIndex < this.symbolsTable.length; blocIndex++){
            this.symbolsTable[blocIndex].forEach((id) => {
                if(id.id == identifier.id) { 
                    idFound = id;
                };
            })
        };

        if(idFound) return idFound;
        throw `variable ${identifier.id} undeclared`
    }

    blocStart(){
        this.symbolsTable.push([]);
    }

    blocEnd(){
        this.symbolsTable.pop();
    }

    // From now I won't support types [ToBeChecked LATER]
    semanticalAnalyze(node){
        switch(node.token.type){
            case '{':
                this.blocStart();
                for(let i = 1; i <= node.childsNbr; i++){
                    this.semanticalAnalyze(node[`child_${i}`]);
                }
                this.blocEnd();
            break;
            case 'decl':
                for(let i = 1; i <= node.childsNbr; i++){
                    if(node[`child_${i}`]){
                        this.declare({id: node[`child_${i}`].token.value,
                        type: node[`child_${i}`].token.type,
                        meta: node[`child_${i}`].token.meta,
                        adr: this.idNum});
                        node[`child_${i}`].adr = this.idNum;
                        this.idNum++;
                    }   
                }
            break;
            case 'const':
            case 'var': 
            break;
            case 'identifier':
                // inference de type + meta attachment
                node.token.adr = this.find({id: node.token.value}).adr;
                node.token.type = this.find({id: node.token.value}).type;
                node.token.meta = this.find({id: node.token.value}).meta;
            break;
            default: 
                for(let i = 1; i <= node.childsNbr; i++){
                    this.semanticalAnalyze(node[`child_${i}`]);
                }
            break;
        }
        return node;
    }
};

const semanticalAnalyze = (rootNode, globalContext) => {
    const analyzer = new semanticalAnalyzer();
    const res = analyzer.semanticalAnalyze(rootNode);
    return res;

}

module.exports = semanticalAnalyze;