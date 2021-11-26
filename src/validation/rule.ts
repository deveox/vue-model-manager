import isAlpha from "validator/lib/isAlpha";
import isAlphanumeric from "validator/lib/isAlphanumeric";
import isBase64 from "validator/lib/isBase64";
import isCreditCard from "validator/lib/isCreditCard";
import isEmail from "validator/lib/isEmail";
import isIP from "validator/lib/isIP";
import isURL from "validator/lib/isURL";
import isUUID from "validator/lib/isUUID";
import Model from "../model";
import ValidationError from "./error";
import { notEmpty } from "./validators";

export type TestFunction = (value: any, m?: Model) => boolean;

export default class Rule {
  prefix: string;
  msg: string;
  test: TestFunction;
  constructor(msg: string, test: TestFunction, prefix = "should") {
    this.test = test;
    this.msg = msg;
    this.prefix = prefix;
  }
  and(r: Rule): Rule {
    return new Rule(`${this.msg} and ${r.msg}`, (v, m) => {
      return this.test(v, m) && r.test(v, m);
    });
  }
  or(r: Rule): Rule {
    return new Rule(`${this.msg} or ${r.msg}`, (v, m) => {
      return this.test(v, m) || r.test(v, m);
    });
  }
  run(v: any, m?: Model): ValidationError | null {
    if (this.test(v, m)) return null;
    return {
      msg: `${this.prefix} ${this.msg}`,
      value: v,
    };
  }
}

export const letters = new Rule("contain only letters", (v: any) => {
  return typeof v === "string" && isAlpha(v);
});

export const lettersAndNumbers = new Rule(
  "contain only letters and numbers",
  (v: any) => {
    return typeof v === "string" && isAlphanumeric(v);
  }
);

export const base64 = new Rule("be a valid base64 string", (v: any) => {
  return typeof v === "string" && isBase64(v);
});

export const creditCard = new Rule(
  "be a valid credit card number",
  (v: any) => {
    return typeof v === "string" && isCreditCard(v);
  }
);

export const email = new Rule("be a valid email address", (v: any) => {
  return typeof v === "string" && isEmail(v);
});

export const ip = new Rule("be a valid IP address", (v: any) => {
  return typeof v === "string" && isIP(v);
});

export const url = new Rule("be a valid URL", (v: any) => {
  return typeof v === "string" && isURL(v);
});

export const uuid = new Rule("be a valid UUID", (v: any) => {
  return typeof v === "string" && isUUID(v);
});

export const positive = new Rule("be a positive number", (v: any) => {
  return typeof v === "number" && v > 0;
});

export const negative = new Rule("be a negative number", (v: any) => {
  return typeof v === "number" && v < 0;
});

export const required = new Rule("be set", notEmpty);

export function inRange(min: number, max: number): Rule {
  return new Rule(
    `be a number in range between ${min} and ${max}`,
    (v: any) => {
      return typeof v === "number" && v > min && v < max;
    }
  );
}

export function equalTo(expected: any): Rule {
  return new Rule(`be equal to '${expected}'`, (v: any) => {
    return v === expected;
  });
}

export function min(min: number): Rule {
  return new Rule(`be a number greater than ${min}`, (v: any) => {
    return typeof v === "number" && v > min;
  });
}

export function max(max: number): Rule {
  return new Rule(`be a number less than ${max}`, (v: any) => {
    return typeof v === "number" && v < max;
  });
}

export function match(
  pattern: string | RegExp,
  msg = "match specific pattern"
): Rule {
  return new Rule(msg, (v: any) => {
    return new RegExp(pattern).test(v);
  });
}

export function same(
  fieldName: string,
  msg = `be same to ${fieldName} field`
): Rule {
  return new Rule(msg, (v: any, m: Model) => {
    return v === m[fieldName];
  });
}

export function length(min: number, max: number = Infinity): Rule {
  return new Rule(
    `be of length in range between ${min} and ${max}`,
    (v: any) => {
      let l = 0;
      if (!v) return false;
      switch (typeof v) {
        case "string":
          l = v.length;
          break;
        case "object":
          if (v instanceof Array) {
            l = v.length;
          } else {
            l = Object.keys(v).length;
          }
      }
      return l > min && l < max;
    }
  );
}

export function not(r: Rule): Rule {
  return new Rule(
    r.msg,
    (v: any, m: Model) => {
      return !r.test(v, m);
    },
    "shouldn't"
  );
}
