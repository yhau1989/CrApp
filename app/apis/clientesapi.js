//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.222.84.162/CrServices/api/cli/';



export async function listcliente() {

    let myurl = url_base + 'clientlist.php';
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




export async function editcliente(id,ruc, nombres,apellidos,direccion,telefono) {

    let myurl = url_base + 'clientedit.php'
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


export async function addcliente(ruc, nombres, apellidos, direccion, telefono) {

    let myurl = url_base + 'clientadd.php'
    let clint = {
        cliente: {
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
                body: JSON.stringify(clint), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson.mensaje;})
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
