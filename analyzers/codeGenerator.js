const semanticalAnalyze = require('./semanticalAnalyzer');
const fs = require('fs');

class CodeGen {
    asmCode = '';
    ifElseLabel = 0;
    ifLabel = 0;
    loopLabel = 0;
    currentLoop = [];

    print(str){
        this.asmCode += str + "\n";
    }

    genNode(node){
        if(! node) return;
        let currentLabel;
        switch(node?.token?.type){
            case "const": 
            case "var":
                if(node.token.adr >= 0){
                    this.print("get " + node.token.adr);
                } else {
                    this.print("push " + node.token.value); // const value could be directly pushed
                }
            break;
            case "+":
                if (node.child_2) {
                    this.genNode(node.child_1);
                    this.genNode(node.child_2);
                } else {
                    this.print('push 0');
                    this.genNode(node.child_1);
                }
                this.print("add");
            break;
            case "-":
                if (node.child_2) {
                    this.genNode(node.child_1);
                    this.genNode(node.child_2);
                } else {
                    this.print('push 0');
                    this.genNode(node.child_1);
                }
                this.print("sub");
            break;       
            case "*": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("mul");
            break;     
            case "/": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("div");
            break;   
            case "%": 
            this.genNode(node.child_1);
            this.genNode(node.child_2);
            this.print("mod");
            break;              
            case "!":
                this.genNode(node.child_1);
                this.print("not");
            break;              
            case "&&": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("and");
            break;              
            case "||": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("or");
            break;              
            case "<=": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmple");
            break;              
            case ">=": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmpge");
            break;              
            case "<": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmplt");
            break;              
            case ">": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmpgt");
            break;    
            case "==": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmpeq");
            break;   
            case "!=": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("cmpne");
            break;   
            case "=": // should re-work this part.
                if(node.child_1.token.type == 'var'){
                    this.genNode(node.child_2); // Evaluate the expression to assign
                    this.print('dup');
                    this.print("set " + node.child_1.token.adr);
                }else if(node.child_1.token.type == 'point'){ // handle writing on left *id
                    node.child_1.write = true;
                    this.genNode(node.child_2); // put value to respect the contract
                    this.genNode(node.child_1); // put adr on the stack
                    this.genNode(node.child_2); // put value on the stack
                    this.print('write');
                } else { // handle reading on right *id
                    this.genNode(node.child_2); // read
                    this.print('dup');
                    this.genNode(node.child_1);
                }
            break;
            case 'ifElse': 
                // Evaluate the condition, the result will be on the top of my stack
                this.ifElseLabel++;
                currentLabel = this.ifElseLabel;
                this.genNode(node.child_1);
                this.print(`jumpf else_${currentLabel}`);
                this.genNode(node.child_2);
                this.print(`jump endIf_Else_${currentLabel}`);
                this.print(`.else_${currentLabel}`);
                this.genNode(node.child_3);
                this.print(`.endIf_Else_${currentLabel}`);
                break;
            case 'if':
                this.ifLabel++;
                currentLabel = this.ifLabel;
                this.genNode(node.child_1);
                this.print(`jumpf endIf_${currentLabel}`);
                this.genNode(node.child_2);
                this.print(`.endIf_${currentLabel}`);
                break;
            case 'drop': // to be checked
                this.genNode(node.child_1);
                this.print('drop');
            break;
            case 'decl': //
            break;
            case 'sec': 
                this.genNode(node.child_1); // print the initialization.
                this.genNode(node.child_2); // print the loop
            break;
            case 'loop':
                this.loopLabel++;
                this.currentLoop.push(this.loopLabel);
                currentLabel = this.loopLabel;
                switch(node.childsNbr){
                    case 1 :  // while loop
                        this.print(`.loop_${currentLabel}`)
                        this.genNode(node.child_1.child_1); // condition should be printed
                        node.child_1.child_3.breakLabel = currentLabel;
                        this.genNode(node.child_1.child_3); // break if condition is not satisfied
                        this.genNode(node.child_1.child_2); // execute instructions if everything is fine
                        this.print(`jump loop_${currentLabel}`);
                        this.print(`.endLoop_${currentLabel}`);
                    break;
                    case 2 : // do while loop
                        this.print(`.loop_${currentLabel}`)
                        this.genNode(node.child_1); // instructions shoud be printed
                        this.genNode(node.child_2.child_1); // condition should be printed
                        node.child_2.child_2.breakLabel = currentLabel;
                        this.genNode(node.child_2.child_2);
                        this.print(`jump loop_${currentLabel}`)
                        this.print(`.endLoop_${currentLabel}`);
                    break;
                    default: // For loop [Already initialized]
                        this.print(`.loop_${currentLabel}`)
                        this.genNode(node.child_3.child_1);
                        node.child_3.child_2.breakLabel = currentLabel;
                        this.genNode(node.child_3.child_2); // break part
                        this.genNode(node.child_2); // instructions execution
                        this.genNode(node.child_1); // next execution
                        this.print(`jump loop_${currentLabel}`)
                        this.print(`.endLoop_${currentLabel}`);
                    break;
                }
                this.currentLoop.pop();
            break;
            case 'break': 
                if (node.breakLabel) {
                    this.print(`jumpf endLoop_${node.breakLabel}`);
                } else {
                    this.print(`jump endLoop_${this.currentLoop[this.currentLoop.length - 1]}`);
                }
            break;
            case 'function': 
                this.print(`.${node.token.value}`); 
                this.print(`resn ${node.numVars}`);
                this.genNode(node.child_2);
                this.print('push 0');
                this.print('ret\n');
            break;
            case 'call':
                this.print(`prep ${node.token.value}`);
                for(let i=1; i <= node.childsNbr; i++) this.genNode(node[`child_${i}`]);
                this.print(`call ${node.childsNbr}`);
            break;
            case 'return': 
                this.genNode(node.child_1);
                this.print('ret');
            break;
            case 'point': 
                this.genNode(node.child_1);
                if(!node.write) this.print('read');
            break;
            case 'adr':
                this.print("prep adrof");
                this.print(`push ${node.numVar}`);
                this.print("call 1");        
            break;
            case '__send__': 
                this.genNode(node.child_1); // put a value to print on the stack
                this.print("send");
            break;
            default: 
                // check and handle other cases for now just print for the childs and skip what is given to u in order
                for(let i = 1; i <= node.childsNbr; i++){
                    this.genNode(node?.[`child_${i}`]);
                }
                break;
        }
    }
}


const codeGenerator = (globalContext, inputFile = "") => {
    const generator = new CodeGen();

    globalContext.path = './analyzers/runtime.c'
    do { generator.genNode(semanticalAnalyze(globalContext)) } while(globalContext.current.type != 'eos');
    globalContext.current = {};
    globalContext.last = {};
    globalContext.pos = -1;
    globalContext.tokens = [];
    
    globalContext.path = inputFile;
    do { generator.genNode(semanticalAnalyze(globalContext)) } while(globalContext.current.type != 'eos');
    generator.print(".adrof\nget -1\nget 0\nsub\npush 1\nsub\nret\n");
    generator.print(".start\nprep main\ncall 0\nhalt");
    return generator.asmCode;
}


module.exports = codeGenerator;

