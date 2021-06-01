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
        console.log(data.data)
        // if (data.data.length > 0) {
        //     let temp = "";
        //     data.data.forEach((itemData) => {
        //         temp += "<tr>";
        //         temp += "<td>" + itemData.id + "</td>";
        //         temp += "<td>" + itemData.name + "</td>";
        //     });
        //     document.getElementById('data').innerHTML = temp;
        // }

        const biblesHashMap = {}

        data.data.forEach((itemData) => {
            let rightChar = itemData.id;
            let leftChar = itemData.name;

            biblesHashMap[rightChar] = leftChar;
        })

        console.log(biblesHashMap)



        const selectBible = document.querySelector('.bible-version');

        selectBible.addEventListener('change', (event) => {

            const biblesHashMap = {}

            data.data.forEach((itemData) => {
                let rightChar = itemData.id;
                let leftChar = itemData.name;

                biblesHashMap[rightChar] = leftChar;
            })

            let userBible = "American Standard Version (Byzantine Text with Apocrypha)";
            let userBibleID = "685d1470fe4d5c3b-01";

            const result = document.querySelector('.result');
            result.textContext = `Bible Version: ${event.target.value}`;

            // check to see if bible Id is in bible hash map
            if (event.target.value in biblesHashMap) {
                userBibleID = biblesHashMap[rightChar]
                userBible = biblesHashMap[leftChar]
                // this should end everything
            }


        });



    } catch (err) {
        console.log(err)
    }
}

