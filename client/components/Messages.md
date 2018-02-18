```js
const mock = require('../mock');
const message = mock.message
const messages = [
  message,
  message,
  message,
  message,
  message,
  message,
  message,
  message
]

<message-list style="height:500px" :messages="messages"/>
```