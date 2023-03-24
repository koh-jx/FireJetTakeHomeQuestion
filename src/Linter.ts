import * as prettier from "prettier";
const lint = async (code: string) => prettier.format(code);
export default lint;