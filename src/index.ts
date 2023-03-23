import * as fs from 'fs';
import { File } from '@babel/types';
import { ParseResult , parse } from '@babel/parser';

export const parseString = () : File => {
    // Parse source.txt
    return parse("code", {
        sourceType: "module",
        plugins: ["typescript"],
    });
}

export const getString = () : string => {
    // Read source.txt
    const code : string = fs.readFileSync("./source.txt", "utf8");
    return code;
}

console.log(getString());