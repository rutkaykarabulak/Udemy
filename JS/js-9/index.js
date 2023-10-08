// promises

const URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";
const request = new Request(URL);

const promise = fetch(request).then(response => {
    if (response.status !== 200) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
}).then(data => {
    console.log(data);
}).catch(error => {
    console.error(`Could not get products: ${error}`);
})


const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
  );
  const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
  );
  const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
  );

  Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
  .then(responses => {
    for(const response of responses) {
        console.log(response.status);
    }
  })
  .catch(error => {
    console.error("An error occured " + error);
  });

  async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch(
        "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
      );
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }

  fetchProducts();