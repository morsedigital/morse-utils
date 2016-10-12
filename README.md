## morse-utils
# Morse Utility Functions

[![Build Status](https://semaphoreci.com/api/v1/djforth/morse-utils/branches/master/badge.svg)](https://semaphoreci.com/djforth/morse-utils)

This is a modulised utility functions to use on Morse Sites/App.

It currently sets up 2 modules:

* Alerts (Close button)
* Cookiebar (Close and set permission cookie)

Set up is like so:

```javascrtipt
var utilies   = require("@djforth/morse-utils")
  , alerts    = require(@djforth/morse-utils/alerts)
  , cookiebar = require(@djforth/morse-utils/cookiebar)

var modules = [
    alerts()
  , cookiebar("cookiebar-id") //Should be id of Cookiebar DOM Node
]

utilies(modules);

```

HTML Set up for Alert

```html
<div id="my-alert">
  Some Alert
  <a href="#" data-alert="my-alert">Close</a>
</div>
```

HTML set up for Cookiebar

```html
<div id="my-cookiebar">
  Cookiebar info... By closing your accepting that you accept that cookies are in use...
  <a href="#" data-cookiebar="my-cookiebar">Close</a>
</div>
```

Note: Cookiebar will apply a cookie named permission for 1 year.  On set up it will remove the cookiebar if this cookie is present.


# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/djforth/morse-utils/issues

## Contribute

If you'd like to contribute, morse-utils is written using babel in ES6.

Please make sure any additional code should be covered in tests (Jasmine using karma).

If you need to run the test please use:

``` bash

npm test

```

or to rebuild the JS run:

``` bash

npm run build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

morse-utils is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the morse-utils project are licensed under MIT license.

