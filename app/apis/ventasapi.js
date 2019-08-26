//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.222.84.162/CrServices/api/ventas/';



export async function listVentasCabeceras() {

    let myurl = url_base + 'ventaslist.php';
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



export async function addventa(data) {

    let myurl = url_base + 'ventaadd.php'
    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => { return responseJson})
            .catch((error) => {return error;});
    } catch (error) {return error;}
}

