export const cart_section = document.querySelector(".main-content__cart");

export let cart = JSON.parse(localStorage.getItem("cart"));

let data;

// Getting the JSON file of goods
$.getJSON("https://mid1i.github.io/Double-Cup/resources/data/data.json", function(json) {
    data = json;
});

// Getting the product info from JSON
export function getProduct(id) {
    let product;

    data.forEach((item) => {
        if (item.id == id) {
            product = item;
        }
    });

    return product;
};

// Adding the product section to the DOM
export function createCartItem(id) {
    let product = getProduct(id);

    if (product) {
        let tree = createStructure(product);

        let cart_item = document.createElement("article");
        cart_item.classList.add("item", `${id}-item`);
        cart_item.append(tree);

        let cart_sep = document.createElement("hr");
        cart_sep.classList.add("cart-sep", `${id}-sep`);
    
        cart_section.append(cart_item, cart_sep);
    }
};

// Creating a product section in the Cart
function createStructure(product) {
    let image = document.createElement("img");
    image.src = product.image;

    let image_wrapper = document.createElement("div");
    image_wrapper.classList.add("item__image");
    image_wrapper.appendChild(image);

    let title = document.createElement("h2");
    title.classList.add("item__title", "title");
    title.innerHTML = product.name;

    let country = document.createElement("p");
    country.classList.add("item__country");
    country.innerHTML = product.country;

    let counter = document.createElement("span");
    counter.classList.add("item__counter", `${product.id}-counter`);
    counter.id = product.id;
    counter.innerHTML = cart[product.id];

    let minus_button = document.createElement("button");
    minus_button.classList.add("item__btn", "minus-btn", `${product.id}-minus`);
    minus_button.id = product.id;
    minus_button.innerHTML = "—";

    let plus_button = document.createElement("button");
    plus_button.classList.add("item__btn", "plus-btn", `${product.id}-plus`);
    plus_button.id = product.id;
    plus_button.innerHTML = "+";

    let buttons = document.createElement("section");
    buttons.classList.add("item__btns-block");
    buttons.append(counter, minus_button, plus_button);

    let delete_button = document.createElement("p");
    delete_button.classList.add("item__delete", `${product.id}-delete`);
    delete_button.id = product.id;
    delete_button.innerHTML = "Удалить";

    let weight = document.createElement("p");
    weight.classList.add("item__weight", `${product.id}-weight`);
    weight.innerHTML = gettingWeight(product, cart[product.id]);

    let price = document.createElement("p");
    price.classList.add("item__price", `${product.id}-price`);
    price.innerHTML = `${cart[product.id] * product.price}.00 ₽`;

    let tree = document.createDocumentFragment();
    tree.append(image_wrapper, title, country, buttons, delete_button, weight, price);

    return tree;
};

export function gettingWeight(product, amount) {  
    let weight;

    if ((product.id == "macarons") || (product.id == "donuts")) {
        weight = Number(product.weight.slice(6, 9)) * amount;
    } else if (product.id == "bananas") {
        weight = 1100 * amount;  
    } else {
        weight = Number(product.weight.slice(0, 4)) * amount;
    }

    if (weight < 1000) {
        return `${weight} гр.`;
    } else if (weight % 1000 == 0) {
        return `${weight / 1000} кг.`;
    } else {
        return `${Math.floor(weight / 1000)} кг. ${weight % 1000} гр.`;
    }
};

export function changeCart() {
    cart = JSON.parse(localStorage.getItem("cart"));
}
