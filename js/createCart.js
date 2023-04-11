// import data from "../data/data.json" assert { type: "json" };
let data;
$.getJSON("https://mid1i.github.io/Double-Cup/data/data.json", function(json) {
    data = json;
});

    export const cart_block_items = document.querySelector(".cart-block-items");

    export let cart = {
        "apples": 0,
        "bananas": 0,
        "cucumbers": 0,
        "tomatoes": 0,
        "white-bread": 0,
        "croissant": 0,
        "chiabatta": 0,
        "black-bread": 0,
        "donuts": 0,
        "macarons": 0,
        "marmalade": 0,
        "cookies": 0,
        "pasta-spirals": 0,
        "pasta-feather": 0,
        "buckwheat": 0,
        "rice": 0,
        "rus-cheese": 0,
        "hol-cheese": 0,
        "boil-sausage": 0,
        "rs-sausage": 0,
        "milk": 0,
        "curd": 0,
        "sour-cream": 0,
        "eggs": 0
    };

    export function getProduct(id) {
        let product;

        data.forEach((item) => {
            if (item.id == id) {
                product = item;
            }
        });

        return product;
    }

    export function createCartItem(id) {
        let product = getProduct(id);

        if (product) {
           let tree = createStructure(product);

           let cart_item = document.createElement("section");
           cart_item.classList.add("cart-block__item", `${id}-cart-item`);
           cart_item.appendChild(tree);
        
           cart_block_items.appendChild(cart_item);
        }
    }

    export function createStructure(product) {
        let image = document.createElement("img");
        image.src = `${product.image}`;

        let image_wrapper = document.createElement("div");
        image_wrapper.classList.add("cart-item__image");
        image_wrapper.appendChild(image);

        let title = document.createElement("h4");
        title.classList.add("cart-item__title");
        title.innerHTML = product.name;

        let counter = document.createElement("div");
        counter.classList.add("cart-item__counter", `${product.id}-counter`);
        counter.id = product.id;
        counter.innerHTML = 1;

        let minus_button = document.createElement("button");
        minus_button.classList.add("cart-item__button", "cart-item__button-minus", `${product.id}-minus`);
        minus_button.id = product.id;
        minus_button.innerHTML = "—";

        let plus_button = document.createElement("button");
        plus_button.classList.add("cart-item__button", "cart-item__button-plus", `${product.id}-plus`);
        plus_button.id = product.id;
        plus_button.innerHTML = "+";

        let buttons = document.createElement("div");
        buttons.classList.add("cart-item__buttons");
        buttons.append(counter, minus_button, plus_button);

        let price = document.createElement("div");
        price.classList.add("cart-item__price", `${product.id}-price`);
        price.innerHTML = `${cart[product.id] * product.price}.00 ₽`;

        let delete_button = document.createElement("div");
        delete_button.classList.add("cart-item__delete", `${product.id}-delete`);
        delete_button.id = `${product.id}`;
        delete_button.innerHTML = "Удалить";

        let tree = document.createDocumentFragment();
        tree.append(image_wrapper, title, buttons, price, delete_button);

        return tree;
    }
