codified_data
===========

# Simple and fast NodeJS codified caching on redis based on package cache-manager-redis-store.

A simple caching module on redis that has `set`, `get` and `delete` methods and works 
as a codified cache storage.
Keys can have a timeout (`ttl`) after which they expire and are deleted from the cache.
All keys are stored in a redis instance.


# Install

```bash
  npm install codified_data --save
```

Or just require the `index.js` file to get the superclass

# Examples:

## Initialize (INIT):


`setup([options])`

Sets and Init redis connection options. It is possible to define a  `host`, `port`, key `ttl` (in ms).

```js
const codifiedData = require( "codified_data" );
codifiedData.setup();
//OR
codifiedData.setup({ttl:0});
```
### Options

- `ttl`: *(default: `0`)* the standard ttl as number in seconds for every generated cache element.
`0` = unlimited
- `clear`: *(default: `false`)* if true flush all key and clear db.
- `host`:*(default: `localhost`)* the redis host.
- `port`:*(default: `6379`)* the redis port
- `db`:*(default: `0`)* the redis database
- `auth_pass`:*(default: `void`)* the redis password


## Store a key (SET):

`set(value, [ options ], callback )`

Sets a `value` to store in cache and if no error return codified key of stored value, to get access to the value next. It is possible to define a custom  `ttl` (in seconds) for this key.
callback  has two parameters `err, codifiedKey`. If error `err` contains error message otherwise `codifiedKey` contains
the codified key of value stored.

```js
obj = { my: "Special", variable: 42 };
codifiedData.set(obj, function( err, key ){
  if( !err && key ){
      // print a string like:  45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
      console.log( key );
  }
});
```

### Options

- `ttl`: The standard ttl as number in seconds for current cache element. It overwrite global `ttl` value

> Note: If the key expires based on it's `ttl` it will be deleted.

## Retrieve a key (GET):

`get( key,[options] [callback] )`

Gets a saved value from the cache.
Returns a `undefined` if not found or expired.
If the value was found it returns the `value` associated to codified key.

```js

//store a value 
let obj = { my: "Special", variable: 42 };
let storeKey;
codifiedData.set(obj, function( err, key ){
  if( !err && key ){
      // print a string like:  45745c60-7b1a-11e8-9c9c-2d42b21b1a3e
      console.log( key );
      storeKey=key;
  }
});



codifiedData.get(storeKey,{delete:true}, function( err, value ){
  if( !err && value ){
      // print { my: "Special", variable: 42 }
      console.log( value );
  }
});

```

### Options

- `delete`: if true delete the key from the cache after reading it.

## Delete a key (DEL):

`deleteKey( key, [callback] )`

Delete a key from cache.

```js
codifiedData.deleteKey( "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", function( err, result ){
  if( !err ){
    console.log( "Deleted" );
    // ... do something ...
  }
});
```

## Get All Keys (KEYS):

`keys([callback] )`

Get all not expired keys

```js
codifiedData.keys(function( err, keys ){
  if( !err ){
    console.log( keys );
    // ["0df05ef0-8917-11e8-94d7-238224a78e45" ]
  }
});
```

## Flush all data (FLUSH):

`flushAll([callback])`

Flush all data.

```js
codifiedData.flushAll(function( err, result ){
   if( !err ){
         console.log( result );
         // "OK"
       }
 });  
```


License - "MIT License"
-----------------------

MIT License

Copyright (c) 2016 aromanino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


Author
------
Alessandro Romanino ([a.romanino@gmail.com](mailto:a.romanino@gmail.com))<br>
Guido Porruvecchio ([guido.porruvecchio@gmail.com](mailto:guido.porruvecchio@gmail.com))

Contributors
------
CRS4 Microservice Core Team ([cmc.smartenv@crs4.it](mailto:cmc.smartenv@crs4.it))
