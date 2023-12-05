// First version was created by [Martin Popel](https://ufal.mff.cuni.cz/martin-popel)

async function alignJSON(src_p, trg_p) {
  const src_spans = src_p.querySelectorAll("mark");
  const trg_spans = trg_p.querySelectorAll("mark");
  //const data = {"src_text":src_p.innerText, "trg_text":trg_p.innerText};
  const data = {"src_tokens":[...src_spans].map(x=>x.innerText),
                "trg_tokens":[...trg_spans].map(x=>x.innerText)};
  try {
    const response = await fetch("https://quest.ms.mff.cuni.cz/ptakopet-mt380/align/en-cs", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    const result = await response.json();
    result.alignment.split(" ").forEach((al)=>{
      let [s_i, t_i] = al.split("-").map(x=>parseInt(x));
      if (s_i < src_spans.length && t_i < trg_spans.length){
        let s = src_spans[s_i];
        let t = trg_spans[t_i];
        if (s.dataset.alignids){s.dataset.alignids += " " + t.dataset.tokenid;}
        else {s.dataset.alignids = t.dataset.tokenid;}
        if (t.dataset.alignids){t.dataset.alignids += " " + s.dataset.tokenid;}
        else {t.dataset.alignids = s.dataset.tokenid;}
      }
    });
    [...src_spans, ...trg_spans].forEach(el=>{
      let al_str = el.dataset.alignids;
      if (al_str) {
        let aligned = al_str.split("-").map(s=>document.querySelector(`mark[data-tokenid="${s}"]`));
        aligned.push(el);
        el.addEventListener("mouseenter", e=>{aligned.forEach(al=>{al.style.backgroundColor='yellow';});});
        el.addEventListener("mouseout", e=>{aligned.forEach(al=>{al.style.backgroundColor='transparent';});});
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

const src_pars = document.querySelectorAll(".par.maincorp");
const trg_pars = document.querySelectorAll(".par:not(.maincorp)");
src_pars.forEach((src_p, i) => {alignJSON(src_p, trg_pars[i]);});
