var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
var currentIndex = 0;
var addBtn = document.getElementById("addBtn");
var products = [];

if (JSON.parse(localStorage.getItem("myProducts")) != null) {
  products = JSON.parse(localStorage.getItem("myProducts"));
  displayData();
}
addBtn.onclick = function () {
  if (addBtn.innerHTML == "add product") {
    addProduct();
  } else {
    updateProduct();
  }
  displayData();
  clearForm();
};
function addProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };
  products.push(product);
  console.log(products);
  localStorage.setItem("myProducts", JSON.stringify(products));
}
function displayData() {
  var cartona = "";
  for (let i = 0; i < products.length; i++) {
    cartona += `<tr>
    <td>${products[i].name}</td>
    <td>${products[i].price}</td>
    <td>${products[i].category}</td>
    <td>${products[i].desc}</td>
    <td><button onclick="getProductInfo(${i})" class="btn btn-sm btn-danger">Update</button></td>
    <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-warning">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function clearForm() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
function deleteProduct(index) {
  products.splice(index, 1);
  displayData();
  localStorage.setItem("myProducts", JSON.stringify(products));
}
searchInput.onkeyup = function () {
  var cartona = "";
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      cartona += `<tr>
      <td>${products[i].name}</td>
      <td>${products[i].price}</td>
      <td>${products[i].category}</td>
      <td>${products[i].desc}</td>
      <td><button class="btn btn-sm btn-danger">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-sm btn-warning">Delete</button></td>
      </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
};
function getProductInfo(index) {
  currentIndex = index;
  var currentProduct = products[index];
  productName.value = currentProduct.name;
  productPrice.value = currentProduct.price;
  productCategory.value = currentProduct.category;
  productDesc.value = currentProduct.desc;

  addBtn.innerHTML = "update product";
}
function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };
  products[currentIndex] = product;
  localStorage.setItem("myProducts", JSON.stringify(products));
  addBtn.innerHTML = "add product";
}
