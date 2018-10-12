const xml = require('@xmpp/xml')

const body = '  hello  '
const stanza = xml`
  <message>
    <body>${body}</body>
  </message>
`
console.log(stanza.toString())


