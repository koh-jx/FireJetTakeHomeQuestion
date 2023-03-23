import { getString, getAST } from './FileParser';
import { traverseAST } from './ASTUtil';
import { lint } from './Linter';

const filepath1 : string = "./source1.txt"
const filepath2 : string = "./source2.txt"
const filepath3 : string = "./source3.txt"
console.log(traverseAST(getAST(filepath1)));
console.log();
console.log(traverseAST(getAST(filepath2)));
console.log();
console.log(traverseAST(getAST(filepath3)));