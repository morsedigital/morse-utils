## morse-utils

# Morse Utility Functions

[![Build Status](https://semaphoreci.com/api/v1/djforth/morse-utils/branches/master/badge.svg)](https://semaphoreci.com/djforth/morse-utils)

This is a modulised utility functions to use on Morse Sites/App.

It currently sets up 4 modules:

- Alerts (Close button)
- Alerts resets (Resets the alerts)
- Cookiebar (Close and set permission cookie)
- ImageViewer (Opens modal for viewing an image)
- Modal (Close and set permission cookie)

Set up is like so:

```javascript
import {
  EventListener,
  AlertClose,
  AlertReset,
  Modal,
  Cookiebar,
  ImageViewer
} from "@morsedigital/morse-utils";

var modules = [
  AlertClose(),
  AlertReset(),
  cookiebar("cookiebar-id") //Should be id of Cookiebar DOM Node
  Modal(),
  ImageViewer(),
];

EventListener(modules);
```

HTML Set up for Alert

```html
<div id="my-alert" aria-hidden="false">
  Some Alert
  <button
    data-alert="my-alert"
    aria-controls="my-alert"
    aria-pressed="false"
    role="button"
  >
    Close
  </button>
</div>
```

HTML set up for close all alerts will close all alerts set as above

```html
<button data-alerts-clear="true" role="button">Close All Alerts</button>
```

HTML set up for opening all alerts will open all closed alerts set as above

```html
<button data-alerts-reset="true" role="button">Open All Alerts</button>
```

HTML set up for Cookiebar

```html
<div id="my-cookiebar" aria-hidden="false">
  Cookiebar info... By closing your accepting that you accept that cookies are
  in use...
  <button
    data-cookiebar="my-cookiebar"
    aria-controls="my-cookiebar"
    aria-pressed="false"
    role="button"
  >
    Close
  </button>
</div>
```

HTML for modal

```html
<button data-modal="modal" data-close-modal="modal-close">open</button>
<section
  class="modal-overlay"
  id="modal"
  aria-hidden="true"
  role="dialog"
  aria-labelledby="modal-title"
>
  <div class="modal-content">
    <button id="modal-close" class="close-btn">x</button>
    <h1 id="modal-title">Candidate 1</h1>
  </div>
</section>
```

HTML for image viewer

```html
<img
  src="my-img"
  data-image-viewer="true"
  data-image-large="/path/to/large/image.jpg"
  data-modal-class="class-to-add-to-modal"
  alt="alt text"
/>
```

Note: Cookiebar will apply a cookie named permission for 1 year. On set up it will remove the cookiebar if this cookie is present.

# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/morsedigital/morse-utils/issues

## Contribute

If you'd like to contribute, morse-utils is written using babel in ES6.

Please make sure any additional code should be covered in tests (Jasmine using karma).

If you need to run the test please use:

```bash

yarn test

```

or to rebuild the JS run:

```bash

yarn run build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

morse-utils is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the morse-utils project are licensed under MIT license.
