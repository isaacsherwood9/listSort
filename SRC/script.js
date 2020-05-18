async function loadData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
// sorting list alphabetically
function sortList(list) {
    list.sort((item1, item2) => {
        if( item2.name > item1.name ){
            return -1;
        }
        else{
            return 1;
        }
    } )
}

//removing item from masterList
function removeFromList(list, id) {
    list.forEach( (item, index) => {
        if(item.id == id ) {
            list.splice( index, 1 );
        }
    })
}




// rendering the masterList

function renderMaster(list,element){
    element.innerHTML = '';
    list.forEach( (item) => {
        let listItem = 
        `<li>
        ${item.name}
        <div class="toolbar">
        <button type="button"
        data-action="perishable"
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}"
        data-catagory="${item.catagory}"
        data-quantity="${item.quantity}">
        Perishable
        </button>
        <button type="button"
        data-action="non-perishable"
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}"
        data-catagory="${item.catagory}"
        data-quantity="${item.quantity}">
        Non Perishable
        </button>
        </div>
        </li>`;
        element.insertAdjacentHTML('beforeend', listItem)
    
    })
}

function renderPerishables(list, element){
    element.innerHTML = '';
    list.forEach( (item) => {
        let listItem = 
        `<li>
        ${item.name}
        <button
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}"
        data-catagory="${item.catagory}"
        data-quantity="${item.quantity}">
        Remove
        </button> 
        </li>`;
        element.insertAdjacentHTML('beforeend', listItem);

    })
}

function rendernonPerishables(list, element){
    element.innerHTML = '';
    list.forEach( (item) => {
        let listItem = 
        `<li>
        ${item.name}
        <button
        data-id="${item.id}"
        data-name="${item.name}"
        data-unit="${item.unit}"
        data-catagory="${item.catagory}"
        data-quantity="${item.quantity}">
        Remove
        </button> 
        </li>`;
        element.insertAdjacentHTML('beforeend', listItem);

    })
}

function storeList( key, list) {
    window.localStorage.setItem(key, JSON.stringify(list));
}
function loadList (key ){
    list = JSON.parse(window.localStorage.getItem(key) );
    return list;
}




let masterList = [];
let perishableList = [];
let nonperishableList = [];
window.addEventListener('load', () => {
    //selectors for view
    const masterDisplay = document.querySelector('#master');
    const nonperishableDisplay = document.querySelector('#non-perishables');
    const perishableDisplay = document.querySelector('#perishables');
    // load the data
    const dataFile = 'data.json';

    //load the master data
    let storedMaster = loadList('master')
    if( storedMaster) {
        masterList = storedMaster;
        renderMaster (masterList, masterDisplay);
    }
    else {
        loadData (dataFile)
        .then( (data) => {
            masterList = data;
            sortList(masterList)
            renderMaster( masterList, masterDisplay);
        })
    };
    //load the perishables
    let storedPerishables = loadList('perishables');
    if( storedPerishables) {
        perishableList = storedPerishables;
        renderPerishables ( perishableList, perishableDisplay);
    };

    //load nonperishables
    let storedNonPerishables = loadList('nonperishables');
    if (storedNonPerishables) {
        nonperishableList = storedNonPerishables;
        rendernonPerishables (nonperishableList, nonperishableDisplay);
    };

    // loadData(dataFile)
    // .then( (data) => {
        
    //     data.forEach( (item) => {
    //         masterList.push( item );
    //     })
    //     sortList(masterList)
    //     renderMaster(masterList, masterDisplay)
    // })

    // add a click listener for masterDisplay
    masterDisplay.addEventListener('click', (event) => {
        //get the event target's attributes
        const action = event.target.getAttribute('data-action');
        const id = event.target.getAttribute('data-id');
        const name = event.target.getAttribute('data-name');
        const unit = event.target.getAttribute('data-unit');
        const catagory = event.target.getAttribute('data-catagory');
        const quantity = event.target.getAttribute('data-quantity');
        const item = { id: id, name: name, unit: unit, catagory: catagory, quantity: quantity};

        if(action=='perishable') {
          perishableList.push(item);
          removeFromList(masterList, id);
          sortList(perishableList);
          const perishableDisplay = document.querySelector('#perishables');
          renderPerishables( perishableList,perishableDisplay );
          renderMaster( masterList, masterDisplay);
          storeList('master', masterList);
          storeList('perishables', perishableList);
        }

        if(action=='non-perishable') {
            nonperishableList.push(item);
            removeFromList(masterList, id);
            sortList(nonperishableList);
            const nonperishableDisplay = document.querySelector('#non-perishables');
            rendernonPerishables( nonperishableList,nonperishableDisplay );
            renderMaster( masterList, masterDisplay);
            storeList('master', masterList);
            storeList('nonperishables', nonperishableList);
          }
    })

    // add a click listener for perishables list view (perishableDisplay)

perishableDisplay.addEventListener('click', (event) => {
          //get the event target's attributes
          const id = event.target.getAttribute('data-id');
          const name = event.target.getAttribute('data-name');
          const unit = event.target.getAttribute('data-unit');
          const catagory = event.target.getAttribute('data-catagory');
          const quantity = event.target.getAttribute('data-quantity');
          const item = { id: id, name: name, unit: unit, catagory: catagory, quantity: quantity};
          //remove from perishableList
          removeFromList(perishableList, id );
          sortList(perishableList);
          renderPerishables(perishableList,perishableDisplay );
          masterList.push(item);
          sortList(masterList);
          renderMaster( masterList, masterDisplay);
          storeList('master', masterList);
          storeList('perishables', perishableList);

    })

nonperishableDisplay.addEventListener('click', (event) => {
        //get the event target's attributes
        const id = event.target.getAttribute('data-id');
        const name = event.target.getAttribute('data-name');
        const unit = event.target.getAttribute('data-unit');
        const catagory = event.target.getAttribute('data-catagory');
        const quantity = event.target.getAttribute('data-quantity');
        const item = { id: id, name: name, unit: unit, catagory: catagory, quantity: quantity};
        //remove from NonperishableList
        removeFromList(nonperishableList, id );
        sortList(nonperishableList);
        rendernonPerishables(nonperishableList,nonperishableDisplay );
        masterList.push(item);
        sortList(masterList);
        renderMaster( masterList, masterDisplay);
        storeList('master', masterList);
        storeList('nonperishables',nonperishableList);
    });
})
