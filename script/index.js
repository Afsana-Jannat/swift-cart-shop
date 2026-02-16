console.log("index is connected")

function loadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => displayProducts(data));
}

function displayProducts(products) {
    const categoryContainer = document.getElementById("category-container")
    for (let product of products) {
        console.log(product);

        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <button class="btn btn-sm rounded-xl hover:bg-[#6D5BF7] hover:text-white">${product}</button>
`;
        categoryContainer.append(categoryDiv)
    }
}
loadCategories()