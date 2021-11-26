# Model

## Declaration

Let's imagine that you need to implement pretty basic `User` model. First of all create a file called `/models/user.ts` with following content:

```ts
import { Model } from 'vue-model-manager'

export default User extends Model {}
```

Here we're importing base [abstract class](https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-classes-and-members) and extending it. However this code won't work yet, so keep reading.

### Base route

Each model has a mandatory property called `baseRoute`. This property represents name of corresponding API endpoint. Let's keep it simple:

```ts
import { Model } from 'vue-model-manager'

export default User extends Model {
  baseRoute = '/users'
}
```

Default actions will build their endpoint basing on this string:

| Action   | Method | URL Template         | Result URL Example |
| -------- | ------ | -------------------- | ------------------ |
| create() | POST   | baseRoute            | /users             |
| delete() | DELETE | baseRoute + '/' + id | /users/1           |
| update() | PATCH  | baseRoute + '/' + id | /users/1           |
| get()    | GET    | baseRoute + '/' + id | /users/1           |

### Fields

Another mandatory property is `fields()`. It's used to define model fields and their behavior:

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
      new Field("name", "John Doe").required(), // or configurable Field instance
      new Field('email').validators(validEmail)
    ];
  }
}

```

You can learn more about fields and `Field` class in [Field section of this guide](/guide/field)

### Methods, Getters / Setters

You can easily define your own methods, getters and setters. No special syntax is needed, just do it like you do in vanilla JS/TS:

```ts
import { Model, Field } from 'vue-model-manager'

export default User extends Model {
  // ...
  firstName: string;
  lastName: string

  fields() {
    return [ "firstName", "lastName" ];
  }

  // Getter
  get fullName() {
    return this.firstName + this.lastName
  }

  // Method
  sayHi() {
    console.log(`Hi ${this.fullName}`)
  }
}
```

### Custom properties

If you have some data that can't be considered as field of the model, you can use simple class property for it.
Same as for methods, no special syntax is needed, just do it like you do in vanilla JS/TS.

**Warning!** If you plan to use custom class properties, then make sure you use TS declarations for fields. It will help you to avoid name conflicts.

```ts
import { Model, Field } from 'vue-model-manager'

export default User extends Model {
  // Custom properties
  emailDomain = ""
  #token = ""

  // add TS declaration of fields so you will be notified about name conflicts
  firstName: string;
  lastName: string

  fields() {
    return [ "firstName", "lastName" ];
  }
}
```

## Registration

When you finish with declaration you need to register your model. Create a file `models/index.ts`:

```ts
// ...
import {ModelManager} from 'vue-model-manager'
import User from './user.ts'

export default class extends ModelManager {
  user
}
createApp(...).use(ModelManager, {models: [User]}).mount('#app')

```

## Usage

There're
