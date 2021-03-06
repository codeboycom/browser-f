// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: unescapedURIComponentSet not containing "#"
es5id: 15.1.3.4_A3.3_T1
es6id: 18.2.6.5
esid: sec-encodeuricomponent-uricomponent
description: encodeURIComponent("#") === "%23"
---*/

if (encodeURIComponent("#") !== "%23") {
  $ERROR('#1: unescapedURIComponentSet not containing "%23"');
}

reportCompare(0, 0);
