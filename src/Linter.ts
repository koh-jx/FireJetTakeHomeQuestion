import * as prettier from "prettier";

export const lint = async (code: string) => prettier.format(code);