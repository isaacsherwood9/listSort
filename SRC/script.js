async function loadData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
let masterList = [];
window.addEventListener('load', () => {
    // load the data
    const dataFile = 'data.json';
    //let response = await fetch(dataFile);
    //if(response.ok) {
    //    let data = await response.json();
    //    console.log(response);
    // }
    //second try
    loadData(dataFile)
    .then( (data) => {
        const masterDisplay = document.querySelector('#master');
        data.forEach( (item) => {
            let id = item.id;
            let name = item.name;
            masterList.push( item );
            let listItem = `<li data-id="${id}">${name}</li>`;
            masterDisplay.insertAdjacentHTML('beforeend', listItem);
        })
    
    })
})