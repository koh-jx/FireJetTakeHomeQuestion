import { getString, getAST } from './FileParser';
import { traverseAST } from './ASTUtil';

// console.log(getString());
// console.log(getAST());
console.log(traverseAST(getAST()));