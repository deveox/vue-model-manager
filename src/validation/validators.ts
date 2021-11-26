export function notEmpty(v: any): boolean {
  if (v === undefined) return false;
  if (v === null) return false;
  switch (typeof v) {
    case "string":
      return v === "";
    case "number":
      return v === NaN;
    case "object":
      return Object.keys(v).length === 0;
    default:
      return true;
  }
}
