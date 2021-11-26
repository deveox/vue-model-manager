export type Validator = (value?: any, ...args: any[]) => boolean;
export type Validators = Validator[];

export function notEmpty(name: string, v: any): Error | null {
  if (v === undefined) return new Error(`field ${name} is empty (undefined)`);
  if (v === null) return new Error(`field ${name} is empty (null)`);
  switch (typeof v) {
    case "string":
      if (v === "") return new Error(`field ${name} is empty ("")`);
      return null;
    case "number":
      if (v === NaN) return new Error(`field ${name} is empty (NaN)`);
      return null;
    case "object":
      if (Object.keys(v).length === 0)
        return new Error(`field ${name} is empty ({} || [])`);
    default:
      return null;
  }
}

export function inRange(v: number, min: number, max: number): boolean {
  return v >= min && v < max;
}

export function notInRange(v: number, min: number, max: number): boolean {
  return !inRange(v, min, max);
}

export function validEmail(v: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(v);
}
