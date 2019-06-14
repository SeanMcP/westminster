type ParsedMatch = {
    doc: string,
    index: number,
    number: number
}

export function parseMatch(string: string): ParsedMatch {
  const [doc, numberString] = string.split("-");
  const number = Number(numberString);
  return {
    doc,
    index: number - 1,
    number
  };
}
