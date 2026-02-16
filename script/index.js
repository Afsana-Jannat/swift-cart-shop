console.log("index is connected")

function loadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => displayCatefories(data));
}

function loadProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then(data => displayProducts(data))
}

const loadCategoryProducts = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(data => displayProducts(data));
}

function displayCatefories(category) {
    const categoryContainer = document.getElementById("category-container")
    for (let product of category) {

        const button = document.createElement("button");
        button.innerText = product;
        //         `
        //         <button onclick='loadCategoryProducts("${product}")'
        //         class="btn btn-sm rounded-xl hover:bg-[#6D5BF7]
        //          hover:text-white">${product}</button>
        // `;

        button.className = "btn btn-sm rounded-xl hover:bg-[#6D5BF7] hover:text-white"
        button.onclick = function () {
            loadCategoryProducts(product);
        }
        categoryContainer.append(button)
    }
}

const displayProducts = (products) => {
    const productContainer = document.getElementById("product-container")

    productContainer.innerHTML = "";

    products.forEach(product => {
        // console.log(product)

        const productCard = document.createElement("div");
        productCard.innerHTML = `
        
        
        <div class="card bg-base-100 shadow-sm h-full flex flex-col">
  <figure class="bg-gray-100 pt-4 pb-4">
    <img
    class="h-[200px] object-cover"
      src="${product.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
   <div class="flex items-center justify-between mb-2">
    <span class="card-title bg-blue-100 text-sm  text-gray-600 px-3 py-1 rounded-full capitalize">
      ${product.category}         </span>
    <div class="flex items-center gap-1">
        <i class="fa-solid fa-star text-yellow-400 text-sm"></i>
        <span class="text-sm font-medium">${product.rating.rate}</span>
        <span class="text-gray-400 text-sm">(${product.rating.count})</span>
    </div>
    </div>
    <p class="font-semibold text-gray-500">${product.title}</p>
    <p class="text-xl font-semibold"><span>$</span>${product.price}</p>
    <div class="card-actions flex items-center justify-between text-gray-500">
      <div class="badge badge-outline"><span><i class="fa-regular fa-eye"></i></span>Details</div>
      <div class="badge badge-outline "><span><i class="fa-solid fa-cart-plus"></i></span>Add</div>
    </div>
  </div>
</div>


        `;

        productContainer.append(productCard)
    });
}

loadCategories()
