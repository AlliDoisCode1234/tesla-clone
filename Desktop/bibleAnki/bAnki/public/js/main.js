// require("dotenv").config({ path: "./config/.env" });

document.querySelector('#fetchBibles').addEventListener('click', getFetch)

async function getFetch() {
    // const todoText = this.parentNode.childNodes[1].innerText
    console.log('clicked')
    try {
        const response = await fetch('https://api.scripture.api.bible/v1/bibles', {
            method: 'get',
            headers: { 'accept': 'application/json', 'api-key': '2e5d71a91294792ed187ecf7c3645b31' },

        })
        const data = await response.json()
        console.log('json receives')
        console.log(data)

    } catch (err) {
        console.log(err)
    }
}

