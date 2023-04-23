export * from './constants';


export const setItemInLocalStorage = (key, value) => {
    if(!key || !value){
        return console.error('Can not set the values in ls');
    }
    const valueTostore = typeof value!== "string"? JSON.stringify(value) : value;

    localStorage.setItem(key, valueTostore);
}
export const getItemInLocalStorage = (key) => {
    if(!key ){
        return console.error('Can not get the values in ls');
    }

   return  localStorage.getItem(key);
}
export const removeItemFromLocalStorage = (key) => {
    if(!key){
        return console.error('Can not remove the values in ls');
    }

    localStorage.removeItem(key);
}
export const getFormBody = (params)=>{
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);

        formBody.push(encodedKey + '=' + encodedValue);

    }

    return formBody.join('&');
}
