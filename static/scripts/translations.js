document.addEventListener("DOMContentLoaded", function () {
    let currentLanguage = "en";

    function changeLanguage(lang) {
        currentLanguage = lang;
        fetch('/static/languages/' + lang + '.json')
            .then(response => response.json())
            .then(data => {
                document.title = data.title;
                document.querySelector('[data-translate="word"]').textContent = data.word;
                document.querySelector('#history a').textContent = data.history;
                document.querySelector('#languages a').textContent = data.languages;
                document.querySelector('#automaton').textContent = data.automaton;
                document.querySelector('#pushdown').textContent = data.pushdown;

                const languageOptions = data["languages-option"];
                document.querySelectorAll('.language-list a').forEach(link => {
                    const newLang = link.getAttribute('data-lang');
                    link.textContent = languageOptions[newLang];
                });
            });
    }

    document.querySelectorAll('.language-list a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});