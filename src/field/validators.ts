export type Validator = (value?: any, ...args: any[]) => boolean;
export type Validators = Validator[];

export function empty(v: any): boolean {
  if (typeof v === "string") {
    return v === "";
  }
  return v === undefined || v === null;
}

export function notEmpty(v: any): boolean {
  return !empty(v);
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
