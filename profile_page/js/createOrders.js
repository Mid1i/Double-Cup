const section = document.querySelector(".main-content__orders");
const empty = document.querySelector(".main-content__text");

let data = [
    {
        "date": "01.02.2023",
        "id": 10,
        "goods": "Яблоки красные: 5шт, хлеб Бородинский: 10шт.,",
        "price": 15500
    },
    {
        "date": "01.01.2022",
        "id": 1002,
        "goods": "Яблоки красные: 5шт,",
        "price": 1000
    }
];

export function createOrders() {
    if (data.length > 0) {
        empty.classList.toggle("hide");

        data.forEach((el) => {
            let item = document.createElement("div");
            item.classList.add("orders-item");
            let tree = createItem(el);
    
            item.appendChild(tree);
            section.appendChild(item);
        })
    }
}

function createItem(data) {
    let date = document.createElement("p");
    date.classList.add("orders-item__date");
    date.innerHTML = data.date;

    let order_num = document.createElement("p");
    order_num.classList.add("orders-item__title");
    order_num.innerHTML = `Заказ № ${data.id}`;

    let goods = document.createElement("p");
    goods.classList.add("orders-item__goods");
    goods.innerHTML = data.goods.slice(0, -2);

    let price = document.createElement("p");
    price.classList.add("orders-item__price");
    price.innerHTML = `${data.price} руб.`;

    let tree = document.createDocumentFragment();
    tree.append(date, order_num, goods, price);
    
    return tree;
}