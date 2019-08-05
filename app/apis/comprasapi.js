//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.222.84.162/CrServices/api/comp/';

export async function listcompra() {

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




export async function editcompra(id,ruc, nombres,apellidos,direccion,telefono) {

    let myurl = url_base + 'loteedit.php'
    let editcli = {
        cliente: {
            id: id,
            ruc: ruc,
            nombres: nombres,
            apellidos: apellidos,
            direccion: direccion,
            telefono: telefono
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


export async function addcompra(proveedor, material, peso, comprador, valor) {

    let myurl = url_base + 'compadd.php'
    let clint = {
        compra: {
            proveedor: proveedor,
            material: material,
            peso: peso,
            comprador: comprador,
            valor: valor
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
