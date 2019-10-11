//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.245.199.128/CrServices/api/odt/';



export async function saveOdt(odt) {

    let myurl = url_base + 'odtadd.php';

    try {
        return await fetch(myurl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(odt),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson; })
            .catch((error) => { return error; });
    } catch (error) { return error; }

}



export async function getOdtListTrituracion() {

    let myurl = url_base + 'odttrituralist.php';

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


export async function saveProcesoTrituracion(odt) {

    let myurl = url_base + 'odtsettritura.php';

    try {
        return await fetch(myurl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(odt),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson; })
            .catch((error) => { return error; });
    } catch (error) { return error; }

}



export async function saveProcesoAlmacena(odt) {

    let myurl = url_base + 'odtsetalmacena.php';

    try {
        return await fetch(myurl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(odt),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson; })
            .catch((error) => { return error; });
    } catch (error) { return error; }

}



export async function getOdtListAlmacenamiento() {

    let myurl = url_base + 'odtalmacenalist.php';

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








//ejemplo
/*

export function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
}
*/
