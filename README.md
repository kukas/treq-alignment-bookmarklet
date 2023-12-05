# treq-alignment-bookmarklet
Bookmarklet for word alignment visualization in the Treq tool.

The first version of the code and bookmarklet was created by [Martin Popel](https://ufal.mff.cuni.cz/martin-popel)

## Bookmarklet
Add the following code to the bookmark url:
```javascript
javascript: (function () {var jsCode = document.createElement('script');jsCode.setAttribute('src', 'https://jirkabalhar.cz/treq-alignment-bookmarklet/align.js');document.body.appendChild(jsCode);}());
```
