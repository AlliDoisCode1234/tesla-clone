document.querySelector('.btns').addEventListener('click', getFetch)

function getFetch() {
    const url = 'https://api.scripture.api.bible/v1/swagger.json'

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}