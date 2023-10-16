const main = document.querySelector("main");
const request = new Request("./products.json");
const select = document.querySelector("#category");
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

function initialize(products) {
    products.forEach(product => {
        const section = document.createElement("section");
        section.setAttribute("class", product.type);
        main.appendChild(section);
        const h2 = document.createElement("h2");
        h2.textContent = product.name;
        const p = document.createElement("p");
        p.textContent =`$${product.price}`;
        const img = document.createElement("img");
        img.setAttribute("alt", `Picture of ${product.name}`);
        img.setAttribute("src", `./images/${product.image}`);
        section.appendChild(h2);
        section.appendChild(p);
        section.append(img);
    })
}

select.addEventListener("change", () => {
    const filter = select.value.toLowerCase();
    const products = document.querySelectorAll(`section.${filter}`);
    const result = [];
    // todo
})