function initAwesomplete() {
    let autocomplete = new Awesomplete('#search');
    Awesomplete.$('#search').addEventListener('awesomplete-select', e =>
        updateSearch(e.text.value)
    );

    Awesomplete.$('#search').addEventListener('keyup', e => {
        if (e.keyCode === 13) {
            updateSearch();
            autocomplete.close();
        }
    });

    updateSearch();
}

function updateSearch(text = $('#search').val()) {
    fetch(window.location.href + 'search?component=' + text).then(response => {
        response.text().then(data => $('#components').html(data));
    });
}