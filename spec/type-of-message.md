## struct

```js
{ type: string, value: any }
```

## types
- `bang`
- `int`
- `float`
- `symbol`
- `list`

## what type is this message?
- `bang`: bang
- `1`: int
- `1.`: float
- `-1`: int
- `+1`: symbol
- `inf`: symbol
- `int 1`: int
- `float 1`: float
- `int`: ERROR
- `float`: ERROR
- `1 2`: list [ int int ]
- `1 2.`: list [ int float ]
- `list 1 2`: list [ int int ]
- `list 1`: [ int ]
- `list 1 list 2 3`: [ int int int ]

### prepend

- `1 | prepend int`: 1
  - `[ { type: "int", value: 1 } ]` => `[ { type: "int", value: 1 } ]`
- `1 | prepend float`: 1.
  - `[ { type: "int", value: 1 } ]` => `[ { type: "float", value: 1 } ]`
- `1 | prepend bang`: bang (warning)
  - `[ { type: "int", value: 1 } ]` => `[ { type: "bang", value: "bang" } ]`
- `1 | prepend 2`: list [ 1 2 ]
  - `[ { type: "int", value: 1 } ]` => `[ { type: "int", value: 1 }, { type: "int", value: 2 } ]`
- `1 | prepend float 2`: ERROR -> 2.
  - `[ { type: "int", value: 1 } ]` => `[ { type: "int", value: 1 }, { type: "float", value: 2 } ]`
- `1 | prepend set`: set 1
  - `[ { type: "int", value: 1 } ]` => `[ { type: "symbol", value: "set" }, { type: "int", value: 2 } ]`
- `1 2 | prepend float`: ERROR -> 1.

### zl.slice

- `1 2 a | zl.slice 2`: [ 1, 2 ] / a
- `int 1 | prepend float | zl.slice 1`: 1.
