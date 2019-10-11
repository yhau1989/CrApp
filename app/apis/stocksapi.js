//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.245.199.128/CrServices/api/stk/';




export async function getStocks() {

    let myurl = 'http://35.245.199.128/CrServices/api/stk/stocklist.php';
    //let myurl = 'https://facebook.github.io/react-native/movies.json';
    try {
        return await fetch(myurl, {
            method: 'POST', // or 'PUT'
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson; })
            .catch((error) => { return error; });
    } catch (error) { return error; }

}