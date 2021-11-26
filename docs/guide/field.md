# Fields

In Vue Model Manager we use special class `Field` for model's fields. It's used only during the model declaration and serves to only one purpose - to declare a field.

To set field on model you need to do following:

```ts
import { Model, Field } from 'vue-model-manager'

export default User extends Model {
  // ...

  // TS-like declaration is highly recommended, but can be omitted
  // do not initialize default values here
  id: number;
  name: string;
  email: string

  fields() {
    return [
      "id", // can be just a string with a field name
      new Field("name", "John Doe"), // or configurable Field instance
      new Field('email')
    ];
  }
}

```

## Basics

`Field` constructor takes three arguments - field name, default value _(optional)_, subfields _(optional)_.

```ts
// Example with field name only, default value will be undefined
new Field("age");

// Example with default value, it can be of any type
new Field("age", 18);
new Field("fruits", ["apple", "pineapple"]);
```

## Readonly

You can make field `readonly`, it won't be writable and will be set only by API response.

```ts
new Field("created").readonly();
```

## Validation

You can set certain validation rules for a field:

```ts
import { email, length } from "vue-model-manager/validation";

new Field("email").validation(email.and(length(10, 22)));
```

[Read more about validation](/guide/validation/)

## Nesting

It's often happens that you need to have a field of object type. You can use 3rd parameter in `Field` constructor to declare nested structures.

```ts
// When you use subfields...
new Field("level1", {}, [
  new Field("level21", undefined, [
    new Field("level31"),
    new Field("level32", 12),
  ]),
  new Field("level22")
])
// ...field will apply following structure on model:
{
  level1: {
    // Despite we set default value of 'level21' to 'undefined' in Field constructor,
    // it's still an object by default.
    // This behavior exists to prevent usage of optional chaining.
    level21: {
      level31: undefined,
      level32: 12,
    },
    level22: undefined,
  }
}
```
