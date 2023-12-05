# treq-alignment-bookmarklet
Bookmarklet for word alignment visualization in the [Treq](https://treq.korpus.cz/) tool.

The first version of the code and bookmarklet was created by [Martin Popel](https://ufal.mff.cuni.cz/martin-popel)

## Bookmarklet
Add the following code to the bookmark url:
```javascript
javascript: (function () {var jsCode = document.createElement('script');jsCode.setAttribute('src', 'https://jirkabalhar.cz/treq-alignment-bookmarklet/align.js');document.body.appendChild(jsCode);}());
```
## Testing links
- czech-english: https://www.korpus.cz/kontext/view?maincorp=intercorp_v15_cs&viewmode=align&pagesize=40&attrs=word&attr_vmode=visible-kwic&base_viewattr=word&refs=%3Ddoc.id&q=~cmC62uwY4eA4&cutoff=0
- czech-ukrainian: https://www.korpus.cz/kontext/view?maincorp=intercorp_v15_cs&viewmode=align&pagesize=40&attrs=word&attr_vmode=visible-kwic&base_viewattr=word&refs=%3Ddoc.id&q=~imKau8QAi0g0&cutoff=0
