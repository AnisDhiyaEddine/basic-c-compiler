
class CodeGen {
    asmCode = '.start\n';
    ifElseLabel = 0;
    ifLabel = 0;
    loopLabel = 0;

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
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("add");
            break;
            case "-": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("sub");
            break;       
            case "*": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("*");
            break;     
            case "/": 
                this.genNode(node.child_1);
                this.genNode(node.child_2);
                this.print("/");
            break;              
            case "!": // should be verified
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
            case "=":
                this.genNode(node.child_2); // Evaluate the expression to assign
                this.print("set " + node.child_1.token.adr);
            break;
            case 'ifElse': 
                // Evaluate the condition, the result will be on the top of my stack
                this.ifElseLabel++;
                currentLabel = this.ifElseLabel;
                this.genNode(node.child_1);
                this.print(`jumpf else_${currentLabel}`);
                this.genNode(node.child_2);
                this.print(`jump endIfElse_${currentLabel}`);
                this.print(`else_${currentLabel}`);
                this.genNode(node.child_3);
                this.print(`endIfElse_${currentLabel}`);
                break;
            case 'if':
                this.ifLabel++;
                currentLabel = this.ifLabel;
                this.genNode(node.child_1);
                this.print(`jumpf endIf_${currentLabel}`);
                this.genNode(node.child_2);
                this.print(`endIf_${currentLabel}`);
                break;
            case 'decl': // Already treated do not print anything while declaring new var [Semantical analyzer is doing the job].
            break;
            case 'sec': 
                this.genNode(node.child_1); // print the initialization.
                this.genNode(node.child_2); // print the loop
            break;
            case 'loop':
                this.loopLabel++;
                currentLabel = this.loopLabel;
                switch(node.childsNbr){
                    case 1 :  // while loop
                        this.print(`loop_${currentLabel}`)
                        this.genNode(node.child_1.child_1); // condition should be printed
                        node.child_1.child_3.breakLabel = currentLabel;
                        this.genNode(node.child_1.child_3); // break if condition is not satisfied
                        this.genNode(node.child_1.child_2); // execute instructions if everything is fine
                        this.print(`jump loop_${currentLabel}`);
                        this.print(`endLoop_${currentLabel}`);
                    break;
                    case 2 : // do while loop
                        this.print(`loop_${currentLabel}`)
                        this.genNode(node.child_1); // instructions shoud be printed
                        this.genNode(node.child_2.child_1); // condition should be printed
                        node.child_2.child_2.breakLabel = currentLabel;
                        this.genNode(node.child_2.child_2);
                        this.print(`jump loop_${currentLabel}`)
                        this.print(`endLoop_${currentLabel}`);
                    break;
                    default: // For loop [Already initialized]
                        this.print(`loop_${currentLabel}`)
                        this.genNode(node.child_3.child_1);
                        node.child_3.child_2.breakLabel = currentLabel;
                        this.genNode(node.child_3.child_2); // break part
                        this.genNode(node.child_1); // next execution
                        this.genNode(node.child_2); // instructions execution
                        this.print(`jump loop_${currentLabel}`)
                        this.print(`endLoop_${currentLabel}`);
                    break;
                }
            break;
            case 'break': 
                this.print(`jumpf endLoop_${node.breakLabel}`);
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


const codeGenerator = (root, globalContext) => {
    const generator = new CodeGen();
    generator.genNode(root);
    generator.asmCode += ".halt\n";
    return generator.asmCode;
}


module.exports = codeGenerator;

