
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
                if(node.token.adr){
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
                this.genNode(node.child_2); // Evaluer l'expression à affecter
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
            case 'sec': 
            break;
            case 'block': 
            break;
            case 'decl':
            break;
            case 'loop':
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






































// const genNode = (node) => {
//     // genNode(if)
//     // genNode(else)
//     // genNode(sec)
//     // genNode(block)
//     // --------------------
//     // function genNode(loop) {
//     //     int temp = label_break;
//     //     label_break = nbLabel++;
//     //     let label_1 = nbLabel++;
//     //     this.print(".l " + label_1);
//     //     loop.children.forEach(child => {
//     //         genNode(child);
//     //         this.print("jump l" + label_1);
//     //         this.print(".l" + label_break);
//     //     });
//     //     label_break = temp;
//     // 
//     // }
//     // --------------------
//     // genNode(break){
//     //     this.print("jump l" + label_break);
//     // }
// }
