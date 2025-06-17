 marked.setOptions({
    highlight: (code, lang) => {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
    },
});

Prism.highlightAll(); // Ensure Prism runs on dynamically added HTML
fetch('https://raw.githubusercontent.com/jimboyz-js/email-sender-api/main/README.md')
.then(r => r.text())
.then(mdText => {
    document.getElementById('content').innerHTML = marked.parse(mdText);
    Prism.highlightAll();
});