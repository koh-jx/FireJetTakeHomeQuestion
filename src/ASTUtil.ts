import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as babelTypes from '@babel/types';
import * as prettier from "prettier";

async function lint(code: string) {
  return prettier.format(code);
}

// find all strings with the prefix comme   nt /*tsx*/ and return them
export const traverseAST = (ast : babelTypes.File) : string[] => {
    const result : string[] = [];

    traverse(ast, {
        enter(path) {
            if (path.isTemplateLiteral()) {
                if (checkLeadingSubstring(path.node)) result.push(getStringLiterals(path.node));
            }
        }
    });

    return result.filter((str) => str !== "");
}

const checkLeadingSubstring = (node : babelTypes.TemplateLiteral) : boolean => {
    if (node.leadingComments === undefined || node.leadingComments === null) return false;
    for (const comment of node.leadingComments) if (comment.value == 'tsx') return true;
    return false;
}

const getStringLiterals = (node : babelTypes.TemplateLiteral) : string => {
    //// Another way is to generate the code, check if there is a leading /*tsx*/ comment, then return the leading substring
    // return generate(node).code;

    // If no expressions, return quasis[0].value.cooked if it is not undefined
    if (node.expressions.length === 0) return node.quasis[0].value.cooked ?? "";

    type ArrElem = { start: number, res: string };
    const tempArr : ArrElem[] = [];
    for (const expr of node.expressions) {
        if (expr.start === undefined || expr.start === null) continue;
        tempArr.push({
            start: expr.start as number,
            res: generate(expr).code
        });
    }

    for (const quasi of node.quasis) {
        if (quasi.start === undefined || quasi.start === null) continue;
        tempArr.push({
            start: quasi.start as number,
            res: quasi.value.raw ?? ""
        });
    }

    return tempArr
            .filter((node : ArrElem) => node.start !== undefined && node.start !== null)
            .sort((a: ArrElem, b: ArrElem) => a.start! - b.start!)
            .map((curr : ArrElem ) : string => curr.res)
            .reduce((acc: string, curr: string) => acc + curr, "");
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