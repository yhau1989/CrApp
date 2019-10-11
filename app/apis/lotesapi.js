//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.245.199.128/CrServices/api/lot/';

export async function listlote() {

    let myurl = url_base + 'lotelist.php';
    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => {return error;});
    } catch (error) {return error;}

}


export async function listloteselection() {

    let myurl = url_base + 'loteselectionlist.php';
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

export async function listlotetrituracion() {

    let myurl = url_base + 'lotetrituracionlist.php';
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

export async function listlotealmacena() {

    let myurl = url_base + 'lotealmacenalist.php';
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



export async function editlote(tipoCambio,lote, user, fini, ffin) {

    let myurl = url_base + 'editloteglobal.php'
    let editcli = {
        lote: {
            tipocambio: tipoCambio,
            id: lote,
            usuario: user,
            fini: fini,
            ffin: ffin
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(editcli), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => { return error;});
    } catch (error) { return error;}
}


export async function addlote(idMaterial, peso) {

    let myurl = url_base + 'loteadd.php'
    let clint = {
        lote: {
            material: idMaterial,
            peso: peso,
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(clint), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson})
            .catch((error) => {return error;});
    } catch (error) {return error;}
}




export async function lotebyId(idMaterial) {

    let myurl = url_base + 'lotelistbymaterial.php'
    let editcli = {
        material: {
            id: idMaterial
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(editcli), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => { return error;});
    } catch (error) { return error;}
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
