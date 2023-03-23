import traverse from "@babel/traverse";
import * as babelTypes from '@babel/types';
import * as prettier from "prettier";

async function lint(code: string) {
  return prettier.format(code);
}

// find all strings with the prefix comment /*tsx*/ and return them
export const traverseAST = (ast : babelTypes.File) : string[] => {
    const result : string[] = [];

    traverse(ast, {
        enter(path) {
            if (path.isTemplateLiteral()) {
                result.push(getStringLiterals(path.node));
            }
        }
    });

    return result;
}

const getStringLiterals = (node : babelTypes.TemplateLiteral) : string => {
    return "";
}

/*
File 
- program : Program
    - type: string = "Program"
    - body: [
        - type: string = "VariableDeclaration" OR "ExportNamedDeclaration"
        - declarations: [
            - type: string = "VariableDeclarator"
            - loc: Object
                - start: Object
                    - line: int
                - end: Object
                    - line: int
            - TemplateLiteral : Node
                - type: string = "TemplateLiteral"
                - leadingComments : []
                    - CommentBlock : node
                - expressions: [
                    - type: string = "Identifier"
                    - start: int
                    - end: int
                    - name: string
                ]
                - quasis: [
                    - TemplateElement : Node
                        - type: string = "TemplateElement"
                        - value: Object
                            - raw: string
                            - cooked: string
                ]
        ]
    ]
*/