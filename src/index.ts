import { getString, getAST } from './FileParser';
import { traverseAST } from './ASTVisitor';

// console.log(getString());
// console.log(getAST());
traverseAST(getAST());