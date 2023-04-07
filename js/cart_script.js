let cart = {
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

document.addEventListener("click", (event) => {
    let arg = event.target;
    let id = arg.id;

    if ((arg.classList.contains(`${id}-button`)) || (arg.classList.contains(`${id}-plus`))) {
        plusFunction(id);
    }

    if (arg.classList.contains(`${id}-minus`)) {
        minusFunction(id);
    }

    checkOrder(id);
});

function plusFunction(id) {
    cart[id]++;

    $(`.${id}-buttons`).removeClass('hide');
    $(`.${id}-button`).addClass('hide');

    $(`.${id}-counter`).html(cart[id]);
};

function minusFunction(id) {
    cart[id]--;

    if (cart[id] <= 0) {    

        $(`.${id}-button`).removeClass('hide');
        $(`.${id}-buttons`).addClass('hide');

        cart[id] = 0;
    }

    $(`.${id}-counter`).html(cart[id]);
};

function checkOrder(id) {
    let check = 0;

    for (var id in cart) {
        if (cart[id] > 0) {check += 1;}
    }
};