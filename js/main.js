let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productDes = document.getElementById('productDes');
let mainBtn = document.getElementById('mainBtn');
let products = [] ;
let newProduct = {};
let myIndex;

////////////////////////////////////////////////////////

function mainBtnFun() {
    newProduct = {
        name : productName.value,
        price : productPrice.value,
        description : productDes.value,
    };
        if(mainBtn.innerHTML === 'Add'){
            products.push(newProduct);
            localStorage.setItem('myProducts' , JSON.stringify(products));
            displayProducts(products);
            clrForm();
        }
        else{
            products[myIndex] = newProduct;
            localStorage.setItem('myProducts' , JSON.stringify(products));
            mainBtn.innerHTML ='Add';
            displayProducts(products);
            clrForm();
        }
};

// ///////// Display Products ////////// //

if (localStorage.getItem('myProducts') != null){
    products = JSON.parse(localStorage.getItem('myProducts'));
    displayProducts(products);
};

function displayProducts(theProducts) {

    let product = ``;
    for (let i = 0; i < theProducts.length; i++) {
        product += `<tr>
        <td>${theProducts[i].name}</td>
        <td>${theProducts[i].price}</td>
        <td>${theProducts[i].description}</td>
        <td><button onClick=(updataProduct(${i})) class="btn btn-outline-success fw-bolder"> <i class="far fa-edit"></i> <small>Update</small> </button></td>
        <td><button onClick=(deleteProduct(${i})) class="btn btn-outline-danger fw-bolder"> <i class="far fa-trash-alt"></i> <small>Delete</small> </button></td>
    </tr>`
    };
    document.getElementById('tableRow').innerHTML = product
};

// ///////// Search Products ////////// //

function search(term) {
    let searchProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            searchProducts.push(products[i])
        }
    }
    displayProducts(searchProducts);
}

// ///////// Delete Products ////////// //

function deleteProduct(index) {
    products.splice(index,1);
    localStorage.setItem('myProducts' , JSON.stringify(products));
    displayProducts(products);
};

// ///////// Update Products ////////// //

function updataProduct(index) {
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productDes.value = products[index].description;
    mainBtn.innerHTML = "Update";
    myIndex = index;
    scroll({
        top : 0 ,
        behavior : 'smooth'
    })
};

// ///////// Clear Form ////////// //

function clrForm() {
    productName.value = '',
    productPrice.value = '',
    productDes.value = ''
};

// ///////// Delete all ////////// //

function clrAll() {
    products = [] ;
    window.localStorage.removeItem('myProducts');
    displayProducts('')
    console.log(products)
};