console.log("index is connected")
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons) {
        btn.classList.remove("active")
    }
}

function loadCategories() {
    fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => displayCatefories(data));
}

function loadProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then(data => {
            removeActiveClass();
            document.getElementById("btn-all").classList.add("active");
            displayProducts(data)
        })
}

const loadCategoryProducts = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${category}`);
            clickedButton.classList.add("active")
            displayProducts(data)
        });
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
        button.id = `btn-${product}`;

        button.className = "btn btn-sm rounded-xl hover:bg-[#6D5BF7] hover:text-white"
        button.onclick = function () {
            loadCategoryProducts(product);
        }
        categoryContainer.append(button)
    }
}


const loadProductDetails = (id) => {
    console.log(id);
    const url = `https://fakestoreapi.com/products/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then(data => displayProductDetails(data));
}

const displayProductDetails = (product) => {
    console.log(product);
    document.getElementById("my_modal_5").showModal();
    const detailsContainer = document.getElementById("modal-container");
    detailsContainer.innerHTML = `
    <div class="card bg-[#7999bc] image-full shadow-sm">
  <figure>
    <img
      src="${product.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body text-white">
    <h2 class="card-title">${product.category}</h2>
    <p>${product.title}</p >
    <p><span></span>${product.description}</p >
    <p><span>Price:  </span>${product.price}</p >
    <p><span>Rating:  </span>${product.rating.rate}</p >
          <div class="badge badge-outline btn btn-xs text-white bg-[#6450f8] "><span><i class="fa-solid fa-cart-plus"></i></span>Add</div>

    <></>
        <div class="card-actions justify-end">
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
  </div >
</div >
    `
}

const displayProducts = (products) => {
    const productContainer = document.getElementById("product-container")

    productContainer.innerHTML = "";

    products.forEach(product => {
        // console.log(product)

        const productCard = document.createElement("div");
        productCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm h-full flex flex-col" >
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
      <div onclick=loadProductDetails("${product.id}") class="badge btn btn-xs badge-outline"><span><i class="fa-regular fa-eye"></i></span>Details</div>
      <div class="badge badge-outline btn btn-xs text-white bg-[#6450f8] "><span><i class="fa-solid fa-cart-plus"></i></span>Add</div>
    </div>
  </div>
 
</>


    `;

        productContainer.append(productCard)
    });
}

loadCategories()
