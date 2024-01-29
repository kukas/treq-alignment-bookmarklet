// First version was created by [Martin Popel](https://ufal.mff.cuni.cz/martin-popel)

function detectLanguagePair(langNodeList) {
  const textsBetweenTags = [...langNodeList].map(x => x.innerText);
  const intercorpMapping = {
    "InterCorp v15 - Czech": "cs",
    "InterCorp v15 - Estonian": "et",
    "InterCorp v15 - Ukrainian": "uk",
    "InterCorp v15 - English": "en",
  }
  let selectedLangs = textsBetweenTags.map(x => intercorpMapping[x]);
  selectedLangs = selectedLangs.join("-");
  const supported = {
    "en-cs": { languagePair: "en-cs", reversed: false },
    "cs-en": { languagePair: "en-cs", reversed: true },
    "cs-uk": { languagePair: "cs-uk", reversed: false },
    "uk-cs": { languagePair: "cs-uk", reversed: true },
    "en-et": { languagePair: "en-et", reversed: false },
    "et-en": { languagePair: "en-et", reversed: true },
  }
  if (supported[selectedLangs]) {
    return supported[selectedLangs];
  }
  return false;
}

async function alignJSON(src_p, trg_p, languagePair) {
  const src_spans = src_p.querySelectorAll("mark");
  const trg_spans = trg_p.querySelectorAll("mark");
  //const data = {"src_text":src_p.innerText, "trg_text":trg_p.innerText};
  const data = {
    "src_tokens": [...src_spans].map(x => x.innerText),
    "trg_tokens": [...trg_spans].map(x => x.innerText)
  };
  try {
    const response = await fetch("https://lindat.cz/services/text-aligner/align/" + languagePair, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    result.alignment.forEach((al) => {
      let [s_i, t_i] = al;
      if (s_i < src_spans.length && t_i < trg_spans.length) {
        let s = src_spans[s_i];
        let t = trg_spans[t_i];
        let mouseenterhandler = e => {
          s.style.backgroundColor = 'yellow';
          t.style.backgroundColor = 'yellow';
        }
        let mouseouthandler = e => {
          s.style.backgroundColor = 'transparent';
          t.style.backgroundColor = 'transparent';
        }
        s.addEventListener("mouseenter", mouseenterhandler);
        t.addEventListener("mouseenter", mouseenterhandler);
        s.addEventListener("mouseout", mouseouthandler);
        t.addEventListener("mouseout", mouseouthandler);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

var select_langs = document.querySelectorAll(".select-primary-lang");
detectedLanguagePair = detectLanguagePair(select_langs);
console.log(detectedLanguagePair);

if (detectedLanguagePair) {
  var src_pars = document.querySelectorAll(".par.maincorp");
  var trg_pars = document.querySelectorAll(".par:not(.maincorp)");
  if (detectedLanguagePair["reversed"]) {
    let temp = src_pars;
    src_pars = trg_pars;
    trg_pars = temp;
  }
  src_pars.forEach((src_p, i) => { alignJSON(src_p, trg_pars[i], detectedLanguagePair["languagePair"]); });
}
else {
  alert("Unsupported language pair.");
}