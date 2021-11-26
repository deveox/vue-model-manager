import Model from "../model";
import * as rules from "./rule";
import ValidationRule from "./rule";

describe("class Rule", () => {
  test("constructor()", () => {
    let r = new ValidationRule("be greater than 10", (v) => v > 10);
    let res = r.run(11);
    expect(res).toBeNull();
    res = r.run(8);
    expect(res).toHaveProperty("msg");
    expect(res.msg).toBe(`${r.prefix} ${r.msg}`);
  });
  test("and()", () => {
    let r1 = rules.length(10, 20);
    let r = rules.email.and(r1);
    let err = r.run("someemail@gmail.com");
    expect(err).toBeNull();
    err = r.run("someloooooongemail@gmail.com");
    expect(err.msg).toBe(
      `${rules.email.prefix} ${rules.email.msg} and ${r1.msg}`
    );
  });
  test("or()", () => {
    let r1 = rules.length(15, 20);
    let r = rules.email.or(r1);
    let err = r.run("someemail@gmail.com");
    expect(err).toBeNull();
    err = r.run("someloooooongeeee");
    expect(err).toBeNull();
    err = r.run("some@gmail.com");
    expect(err).toBeNull();
    err = r.run("some");
    expect(err.msg).toBe(
      `${rules.email.prefix} ${rules.email.msg} or ${r1.msg}`
    );
  });
  test("not()", () => {
    let r = rules.not(rules.email);
    let err = r.run("someemail@gmail.com");
    expect(err.msg).toBe(`shouldn't ${r.msg}`);
    err = r.run("someloooooongeeee");
    expect(err).toBeNull();
  });
});
