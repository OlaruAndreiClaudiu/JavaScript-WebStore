const product = [
    {
        id: 0,
        image: './assets/img/image1.jpg',
        title: 'Push Up Bars',
        price: 50,
        number: 10,
    },
    {
        id: 1,
        image: './assets/img/image2.jpg',
        title: 'Dumbbell',
        price: 150,
        number: 20,
    },
    {
        id: 2,
        image: './assets/img/image3.jpg',
        title: 'Pull Up Bar',
        price: 250,
        number: 30,
    },
    {
        id: 3,
        image: './assets/img/image4.jpg',
        title: 'Barbell',
        price: 350,
        number: 40,
    }
];
const products = [...new Set(product.map((item)=>
{return item}))]
let i=0;
document.getElementById('root').innerHTML = products.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='image' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('');
var cart =[];
function addtocart(a) {
    cart.push({...products[a]});
    displaycart();
}
function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}
function displaycart() {
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
    }
    else {
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total = total + price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                <img class='rowimg' src=${image}>
                </div>
                <button onclick="totalClick(1)" style='width: 10px;'>+</button>
                <span id="totalClicks">1</span>
                <button onclick="totalClick(-1)" style='width: 10px;'>-</button>
                <p style='font-size: 12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
    } 
}
function clear() {
    document.getElementById('cartItem').innerHTML = "Your cart is empty";
    document.getElementById("total").innerHTML = "$ "+0+".00";
    document.getElementById("count").innerHTML = 0;
    cart.length = 0;
    renderCart();
}
document.getElementById("clear-btn").addEventListener("click", clear);
function checkout() {
    if(cart.length == 0) {
        alert(`Your cart is empty!`);
        return;
    } else {
        (cart.length > 0) 
            alert(`Thank you for your purchase!`);
            document.getElementById('cartItem').innerHTML = "Your cart is empty";
            document.getElementById("total").innerHTML = "$ "+0+".00";
            document.getElementById("count").innerHTML = 0;
            cart.length = 0;
    }
    renderCart();
}
document.getElementById("checkout-btn").addEventListener("click", checkout);
renderProducts();
function totalClick(click) {
    let total=0;
    const totalClicks = document.getElementById('totalClicks');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    totalClicks.innerText = sumvalue;
    if(sumvalue > 1) {
        total = total + price;
        document.getElementById("total").innerHTML = "$ "+total+".00";
        return;
    }
    if(sumvalue <= 1) {
        totalClicks.innerText = 1;
    }
}