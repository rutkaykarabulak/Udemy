const worker = new Worker("./worker.js")

document.querySelector("#generate").addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    worker.postMessage({
        command: "generatePrime",
        quota: quota
    });
});

worker.addEventListener("message", (message) => {
    document.querySelector(
      "#output",
    ).textContent = `Finished generating ${message.data} primes!`;
  });


