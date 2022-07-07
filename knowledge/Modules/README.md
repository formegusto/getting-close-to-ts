# Modules

ECMAScript 2015부터 JavaScript에는 모듈 개념이 있었다. 모듈은 전역스코프가 아닌, 자체 스코프 내에서 실행된다. export 문법 중 하나를 사용하여 export 하지 않으면 모듈 외부에서 보이지 않는다. 반대로 모듈을 가지고 오기 위해서는 import 문법 중 하나를 사용하여야 한다. 즉, 모듈은 선연형이다. 파일 수준의 imports 또는 exports 관점에서 지정된다.

모듈은 Module Loader를 사용하여 다른 모듈을 import 한다. Javascript에서 사용하는 유명한 모듈 로더로는 CommonJS 모듈용 Node.js의 로더와 웹 애플리케이션의 AMD 모듈용 RequireJS 로더가 있다.

TypeScript는 import 혹은 export가 포함된 모들 파일을 모듈로 간주한다. 반대로 import, export 선언이 없는 파일은 전역 스코프에서 사용할 수 있는 스크립트로 처리가 된다.

## Export

**[ Exporing a declaration ]** export 키워드를 추가하면 모든 변수, 함수, 클래스, 타입 별칭, 인터페이스를 export 할 수 있다.

```tsx
export interface StringValidator {
  isAcceptable(s: string): boolean;
}
```

그 밖에 as 문을 사용하여 export 할 이름을 바꿔 리턴 시킬 수 있다.

```tsx
class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegExp.test(s);
  }
}

export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```

**[ Re-export, export … from ]** 기존 모듈의 이름을 변경시킨 상태로 Open 시킬 수 있다.

```tsx
export { ZipCodeValidator as RegExpBasedZipCodeValidator } from "./ZipCodeValidator";
```

하나의 모듈은 하나 혹은 여러개의 모듈을 감쌀 수 있다. export \* from ‘module’ 구문을 사용하여 export 하는 것들을 모두 결합할 수 있으며, 이는 index.ts 선언에 활용이 된다.

```tsx
export * from "./StringValidator";
export * from "./ZipCodeValidator";
```

## Import

**[ 단일 export를 import 하기 ]** import의 사용법과 활용법은 모두 export와 같다. 모듈을 가지고 오는 것 뿐만 아니라 원하는 이름으로 변경이 가능하다.

```tsx
import { ZipCodeValidator } from "./validator";
import { ZipCodeValidator as subValidator } from "./validator";
```

**[ 전체 모듈을 단일 변수로 import ]**

```tsx
import * as validator from "./validator";

const { ZipCodeValidator } = validator;
console.log(new ZipCodeValidator().isAcceptable("testt"));
```

**[ import type ]** typescript 3.8 이후에 생긴 문법으로 명시적으로 type을 가지고 올 수 있다. 코드의 가독성을 위해 추가한 문법 인 것 같다.

```tsx
import { CODE } from "./validator/types";
import type { CODE } from "./validator/types";
```

## Default exports

각 모듈은 선택저으로 default 를 export 할 수 있다. 이는 export deafult 라는 키워드로 표시된다. 모듈당 하나의 default export를 진행할 수 있다. 클래스, 함수 선언문 그리고 값은 default exports로 직접 작성될 수 있다.

```tsx
export default class ZipCodeValidator {
  /* ... */
}
export default function (s: string) {
  /* ... */
}
export default "123";
```

## Export all as x

Typescript 3.8 버전 이후로는 export all 구문에 as x 를 추가할 수 있다.

```tsx
export * as ZipValid from "./ZipCodeValidator";

ZipValid.mainValidator;
ZipValid.numberRegExp;
```

## export = and import = require()

CommonJS와 AMD 둘 다 일반적으로 모듈의 모든 exports를 포함하는 exports 객체의 개념을 가지고 있고, exports 객체를 사용자 정의 단일 객체로 대체하는 기능을 지원한다. typescript에서는 export default 문법으로 대체된다. 하지만 이 둘은 호환되지 않는데, TypeScript는 기존의 CommonJS와 AMD 워크플로우를 모델링하기 위하여 export = 문법을 지원한다.

export = 구문은 모듈에서 export 되는 단일 객체를 지정한다. 클래스, 인터페이스, 네임스페이스, 함수 혹은 열거형이 될 수 있다.

```tsx
const numberRegExp = new RegExp("/^[0-9]+$/");

class ZipCodeValidator implements StringValidator {
  isAcceptable(s: string): boolean {
    return s.length === 5 && numberRegExp.test(s);
  }
}

export = ZipCodeValidator;
```

export = 구문을 통해 export된 모듈은 TypeScript에 특정한 문법 import module = require(”module”)을 사용하여 모듈을 가져와야 한다.

```tsx
import zip = require("./validator/ZipCodeValidator");

console.log(new zip().isAcceptable("test"));
```

## Optional Module Loading and Other Advaced Loading Scenarios

상황에 따라 특정 조건에서만 모듈을 로드하도록 할 수 있다. 이 아이디어는 import id = require(”…”) 문을 통해 모듈로 노출된 타입에 접근이 가능하다. 이 때, declare.d.ts 에 require이 정의되어 있어야 한다.

```tsx
declare function require(moduleName: string): any;
```

```tsx
import * as Zip from "./validator/ZipCodeValidator";

const needZipValidation = true;
if (needZipValidation) {
  let ZipCodeValidator: typeof Zip = require("./validator/ZipCodeValidator");
  let validator = new ZipCodeValidator.ZipCodeValidator();

  if (validator.isAcceptable("...")) {
  }
}
```

이 외에도 import 라는 비동기 방식의 module loading 방식도 있다.

```tsx
(async function () {
  const zipCode = await import("./validator/ZipCodeValidator");

  let validator = new zipCode.ZipCodeValidator();
  console.log(validator.isAcceptable("..test"));
})();
```

## Guidance for structuring modules

1. 가능한 top-level 에 가깝게 export 하기
2. 단일 클래스나 함수를 export 할 경우, export default 사용하기
3. 여러 객체를 export 하는 경우, top-level에 둔다.
4. impor한 이름을 명시적으로 나열한다.
5. 많은 것을 import 하는 경우, namespace import pattern을 사용한다.
