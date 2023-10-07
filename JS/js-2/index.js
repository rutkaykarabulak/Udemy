const products = ['Underpants:6.99',
'Socks:5.99',
'T-shirt:14.99',
'Trousers:31.99',
'Shoes:23.99'];
let total = 0;
for(const product of products) {
    const arr = product.split(":");
    const nameOfProduct = arr[0];
    const price = Number(arr[1]);
    total += price;
}