const main = document.querySelector("main");
const request = new Request("./products.json");
const select = document.querySelector("#category");
// Fetch the products from @file products.json
const promise = fetch(request);
promise
.then(response => {
    if (!response.ok) {
        throw new Error("An error occured during network call");
    }
    return response.json();
})
.then(products => {
    initialize(products);
})
.catch(error => {
    console.log("An error occured: " + error);
})

// Creates card in main section for each product in products
function initialize(products) {
    products.forEach(product => {
        createItem(product);
    })
}
// array that stores all created product elements
let allProductSections = [];

function createItem(product) {
    // create new elements
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const section = document.createElement("section");
    
    const photoURL = `./images/${product.image}`;
    fetch(photoURL)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }
        return response.blob();
    })
    .then (blob => {
        const url = URL.createObjectURL(blob);
        img.src = url;
    })
    .catch(error => {
        console.log("Fetch problem:" + error.message);
    })

    // Set their attributes
    h2.textContent = product.name;
    p.textContent =`$${product.price}`;
    img.setAttribute("alt", `Picture of ${product.name}`);
    section.setAttribute("class", product.type);
    
    // Append new elements
    main.appendChild(section);
    section.appendChild(h2);
    section.appendChild(p);
    section.append(img);

    allProductSections.push(section);
}

// Filter by select value and show the items according to filter
select.addEventListener("change", () => {
    const filter = select.value.toLowerCase();
    filterBy(filter, main, allProductSections);
})

function filterBy(filter, main, allProductSections) {
    // products to be shown
    const products = filter === "all" ? allProductSections : 
    allProductSections.filter(p => p.getAttribute("class").includes(filter));
    // remove all elements inside of main.
    main.innerHTML = '';

    products.forEach(p => {
        main.appendChild(p);
    })
}