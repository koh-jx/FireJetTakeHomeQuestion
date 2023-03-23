import { parse } from '@babel/parser';
import * as babelTypes from '@babel/types';
import * as fs from 'fs';

const parseString = (codeString : string) : babelTypes.File => {
    // Parse source.txt
    return parse(codeString, {
        sourceType: "module",
        plugins: ["typescript"],
    });
}

export const getString = (filepath: string) : string => {
    // Read source.txt
    const code : string = fs.readFileSync(filepath, "utf8");
    return code;
}

export const getAST = (filepath: string) : babelTypes.File => {
    return parseString(getString(filepath));
}