//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.245.199.128/CrServices/api/prov/';



export async function listproveedor() {

    let myurl = url_base + 'proveelist.php';
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


export async function listproveedorMant() {

    let myurl = url_base + 'proveelistmant.php';
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


export async function editproveedor(id, ruc, nombres, apellidos, direccion, telefono, estado) {

    let myurl = url_base + 'proveeedit.php'
    let editprovee = {
        proveedor: {
            id: id,
            ruc: ruc,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            estado: estado
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(editprovee), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => { return error;});
    } catch (error) { return error;}
}


export async function addproveedor(ruc, nombres, apellidos, direccion, telefono, estado) {

    let myurl = url_base + 'proveeadd.php'
    let provee = {
        proveedor: {
            ruc: ruc,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono,
            estado: estado
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(provee), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson;})
            .catch((error) => {return error;});
    } catch (error) {return error;}
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
