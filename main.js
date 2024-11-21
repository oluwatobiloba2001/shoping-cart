let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let shopItemsData = [
    {
    id:'hhauuauu',
    name: 'Casual Shirt',
    price: 45,
    desc: "lorem8 jiai ijiefs iejijfd iqojiej jeirjijs",
    img: 'images/img-1.jpg'
},
{
    id:'jajfds',
    name: 'Office Shirt',
    price: 55,
    desc: "lorem8 jiai ijiefs iejijfd iqojiej jeirjijs",
    img: 'images/img-2.jpg'
},
{
    id:'svsinq',
    name: 'T Shirt',
    price: 100,
    desc: "lorem8 jiai ijiefs iejijfd iqojiej jeirjijs",
    img: 'images/img-3.jpg'
},
{
    id:'sjivnsi',
    name: 'Mens suit',
    price: 300,
    desc: "lorem8 jiai ijiefs iejijfd iqojiej jeirjijs",
    img: 'images/img-4.jpg'
}
];

let generateShop = () => {
    return shop.innerHTML = shopItemsData.map(x => {
        let {id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id) || [];
        return `
    <div class="items" id=product-id-${id}>
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>
                    ${desc}
                </p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
    </div>
    `;
    }).join('');
};
generateShop();

let increment = (id) => {
    let selected = id;
    let search = basket.find((x) => x.id === selected.id);
    if(search === undefined) {
        basket.push({
            id: selected.id,
            item: 1
        })
    }else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selected.id);
};

let decrement = (id) => {
    let selected = id;
    let search = basket.find((x) => x.id === selected.id);
    
    if (search === undefined) return;
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));
    // console.log(basket);
    update(selected.id);
};
let update = (id) => {
    let search = basket.find(x => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerText = basket.map((x) =>x.item).reduce((x,y) => x+ y, 0);
};
calculation();