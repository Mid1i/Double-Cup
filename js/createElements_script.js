$.getJSON("https://mid1i.github.io/Double-Cup/data/data.json", function(json) {
    let data = json;

    for (let i = 0; i < data.length; i++) {
        let products_slider_item = document.createElement("section");
        products_slider_item.classList.add("products-slider-item");
    
        let products_item = document.createElement("section");
        products_item.classList.add("products-item", `${data[i].id}-item`);
    
        let tree = createItem(i);
    
        products_item.appendChild(tree);
        products_slider_item.appendChild(products_item);
        
        document.querySelector(`.${data[i].section}-products`).appendChild(products_slider_item);
    };
    
    
    function createItem(i) {
        let image = document.createElement("img");
        image.src = data[i].image;
    
        let image_wrapper = document.createElement("div");
        image_wrapper.classList.add("item__image");
        image_wrapper.appendChild(image);
    
        let title = document.createElement("h3");
        title.classList.add("item__title");
        title.innerHTML = data[i].name;
    
        let country = document.createElement("div");
        country.classList.add("item__country");
        country.innerHTML = data[i].country; 
    
        let price = document.createElement("div");
        price.classList.add("item__price");
        price.innerHTML = `${data[i].price}.00 ₽`;
    
        let weight = document.createElement("div");
        weight.classList.add("item__weight");
        weight.innerHTML = data[i].weight;
    
        let cost = document.createElement("section");
        cost.classList.add("item__cost");
        cost.append(price, weight);
    
        let main_button = document.createElement("button");
        main_button.classList.add("item__main-button", "button", `${data[i].id}-button`);
        main_button.id = data[i].id;
        main_button.innerHTML = "В корзину";
    
        let minus_button = document.createElement("button");
        minus_button.classList.add("item__button-minus", "button", `${data[i].id}-minus`);
        minus_button.id = data[i].id;
        minus_button.innerHTML = "—";
    
        let counter = document.createElement("div");
        counter.classList.add("item__counter", `${data[i].id}-counter`);
        counter.id = data[i].id;
        counter.innerHTML = "+";
    
        let plus_button = document.createElement("button");
        plus_button.classList.add("item__button-plus", "button", `${data[i].id}-plus`);
        plus_button.id = data[i].id;
        plus_button.innerHTML = "+";
    
        let buttons = document.createElement("section");
        buttons.classList.add("item-buttons", `${data[i].id}-buttons`, "hide");
        buttons.append(minus_button, counter, plus_button);
    
        let tree = document.createDocumentFragment();
        tree.append(image_wrapper, title, country, cost, main_button, buttons);
    
        return tree;
    }
});


