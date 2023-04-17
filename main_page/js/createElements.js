import { productSlider } from "./slider.js";

// Getting the JSON file of goods
$.getJSON("https://mid1i.github.io/Double-Cup/resourses/data/data.json", function(data) {

    // Adding product blocks to the DOM
    for (let i = 0; i < data.length; i++) {
        let product_slider_item = document.createElement("section");
        product_slider_item.classList.add("product-block__slider-item");
    
        let product_item = document.createElement("section");
        product_item.classList.add("product-block__item", `product-block__item_${data[i].id}`);
    
        let tree = createItem(i);
    
        product_item.appendChild(tree);
        product_slider_item.appendChild(product_item);
        
        document.querySelector(`.product-block_${data[i].section}`).appendChild(product_slider_item);
    };

    // Adding a slider for small screens
    productSlider();
    
    // Create a product item block
    function createItem(i) {
        let image = document.createElement("img");
        image.src = data[i].image;
    
        let image_wrapper = document.createElement("div");
        image_wrapper.classList.add("product__item__image");
        image_wrapper.appendChild(image);
    
        let title = document.createElement("h3");
        title.classList.add("product__item__title");
        title.innerHTML = data[i].name;
    
        let country = document.createElement("p");
        country.classList.add("product__item__country");
        country.innerHTML = data[i].country; 
    
        let price = document.createElement("p");
        price.classList.add("product__item__price");
        price.innerHTML = `${data[i].price}.00 ₽`;
    
        let weight = document.createElement("p");
        weight.classList.add("product__item__weight");
        weight.innerHTML = data[i].weight;
    
        let cost = document.createElement("section");
        cost.classList.add("product__item__cost");
        cost.append(price, weight);
    
        let main_button = document.createElement("button");
        main_button.classList.add("product__item__main-btn", "btn", `js-${data[i].id}-btn`);
        main_button.id = data[i].id;
        main_button.innerHTML = "В корзину";
    
        let minus_button = document.createElement("button");
        minus_button.classList.add("product__item__btn-minus", "btn", `js-${data[i].id}-minus`);
        minus_button.id = data[i].id;
        minus_button.innerHTML = "—";
    
        let counter = document.createElement("div");
        counter.classList.add("product__item__counter", `js-${data[i].id}-counter`);
        counter.id = data[i].id;
        counter.innerHTML = "+";
    
        let plus_button = document.createElement("button");
        plus_button.classList.add("product__item__btn-plus", "btn", `js-${data[i].id}-plus`);
        plus_button.id = data[i].id;
        plus_button.innerHTML = "+";
    
        let buttons = document.createElement("section");
        buttons.classList.add("product__item__btns-block", `js-${data[i].id}-btns`, "hide");
        buttons.append(minus_button, counter, plus_button);
    
        let tree = document.createDocumentFragment();
        tree.append(image_wrapper, title, country, cost, main_button, buttons);
    
        return tree;
    }
});
