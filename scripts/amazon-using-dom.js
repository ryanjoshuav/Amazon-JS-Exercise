import { cart, addToCart,calculateCartQuantity } from "../data/cart-for-exercise.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

function createProductElement(productObject, index) {
    const { id, image, name, rating, priceCents, keywords } = productObject;

    const productContainer = document.createElement('div');
    productContainer.className = 'product-container';

    //Image Container
    const productImageContainer = document.createElement('div');
    productImageContainer.className = 'product-image-container';

    const productImage = document.createElement('img');
    productImage.className = 'product-image';
    productImage.src = `${image}`;

    productImageContainer.appendChild(productImage);

    //Product Name
    const productName = document.createElement('div');
    productName.className = 'product-name limit-text-to-2-lines';
    productName.textContent = name

    //Rating Container
    const productRatingContainer = document.createElement('div');
    productRatingContainer.className = 'product-rating-container';
    
    const productRatingStars = document.createElement('img');
    productRatingStars.className = 'product-image';
    productRatingStars.src = `images/ratings/rating-${rating.stars * 10}.png`;

    const productRatingCount = document.createElement('div');
    productRatingCount.className = 'product-rating-count link-primary';
    productRatingCount.textContent = rating.count;

    productRatingContainer.appendChild(productRatingStars);
    productRatingContainer.appendChild(productRatingCount);

    //Product Price
    const productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.textContent = formatCurrency(priceCents);

    //Product Quantity Container
    const productQuantityContainer = document.createElement('div');
    productQuantityContainer.className = 'product-quantity-container';

    const selectElement = document.createElement('select');
    selectElement.id = `js-quantity-selector-${id}`;

    for (let i = 1; i <= 10; i++) {
        const optionElement = document.createElement('option');
        optionElement.value = i;
        optionElement.textContent = i;
        if (i === 1) {
            optionElement.selected = true;
        }
        selectElement.appendChild(optionElement);
    }

    productQuantityContainer.appendChild(selectElement);

    const productSpacer = document.createElement('div');
    productSpacer.className = 'product-spacer';

    const addedToCartElement = document.createElement('div');
    addedToCartElement.className = `added-to-cart js-added-to-cart-${id}`;

    const checkmarkElement = document.createElement('img');
    checkmarkElement.src = 'images/icons/checkmark.png';

    const addedText = document.createTextNode('Added');

    addedToCartElement.appendChild(checkmarkElement);
    addedToCartElement.appendChild(addedText);

    const addToCartButton = document.createElement('button');
    addToCartButton.classList = 'add-to-cart-button button-primary js-add-to-cart';
    addToCartButton.setAttribute('data-product-id', id);
    addToCartButton.textContent = 'Add to cart';
    addToCartButton.addEventListener('click', () =>{

        addToCart(id);
        updateCartQuantity();
        showAdded(id);
    })

    productContainer.appendChild(productImageContainer);
    productContainer.appendChild(productName);
    productContainer.appendChild(productRatingContainer);
    productContainer.appendChild(productPrice);
    productContainer.appendChild(productQuantityContainer);
    productContainer.appendChild(productSpacer);
    productContainer.appendChild(addedToCartElement);
    productContainer.appendChild(addToCartButton);

    return productContainer;
}   

function renderProducts() {
    const productsGridContainer = document.querySelector('.js-products-grid');
    productsGridContainer.innerHTML = '';

    products.forEach((product,index) => {
        const productHTML = createProductElement(product, index);
        productsGridContainer.appendChild(productHTML);
    });
    console.log(productElement);
}

function updateCartQuantity() {
    let cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').
    innerHTML = cartQuantity;
}

let hideTimer;
function showAdded(productId) {

    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    if (addedToCart.classList.contains('added')) {
        // If it's already added, remove it first to reset the visibility
        addedToCart.classList.remove('added');
        clearTimeout(hideTimer);
    }
    addedToCart.classList.add('added');
    hideTimer = setTimeout(function() {
        addedToCart.classList.remove('added');
    }, 2000); // 2000 milliseconds = 2 seconds
}


renderProducts();