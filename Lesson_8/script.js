var shop_items = [{
        name: "Schecter Demon-7",
        img: "img/DEMON_2.png",
        big_img: "img/DEMON_2_big.png",
        cost: 32000,
        count: 0
    },
    {
        name: "Schecter OMEN-8",
        img: "img/OMEN-8_2.png",
        big_img: "img/OMEN-8_big.png",
        cost: 24000,
        count: 0
    },
    {
        name: "Schecter C-5 BASS SGR",
        img: "img/C-5%20SGR_2.png",
        big_img: "",
        cost: 17000,
        count: 0
    }];

var sum = 0,
    countItems = 0;

function init() { //Функция формирования товаров
    var catalog = document.getElementsByClassName("pr")[0];
    var i, a, item, img, span;
    for (i = 0; i < shop_items.length; i++) {
        item = document.createElement("div");
        item.setAttribute("class", "pr_1");

        img = document.createElement("img");
        img.setAttribute("class", "product");
        img.id = "pr_1_" + i;
        img.src = shop_items[i].img;
        img.style.height = "500px";
        img.onclick = clickImg;
        item.appendChild(img);

        span = document.createElement("span");
        span.textContent = shop_items[i].name;
        item.appendChild(span);

        span = document.createElement("span");
        span.textContent = shop_items[i].cost + "\u20bd";
        item.appendChild(span);

        itemBtn = document.createElement("input");
        itemBtn.type = "button";
        itemBtn.setAttribute("class", "button_buy");
        itemBtn.value = "Купить";
        itemBtn.setAttribute("id", "shop_item_" + i);
        itemBtn.onclick = clickFunction;
        item.appendChild(itemBtn);

        catalog.appendChild(item);
    }
}

function clickFunction(event) { //Функция формирования корзины и расчета стоимости
    var table = document.getElementById("shop_items"),
        tr = document.createElement('tr'),
        td = document.createElement('td'),
        id = event.target.id.split("_");
    if (shop_items[id[2]].count === 0) {
        table.appendChild(tr);
        td.textContent = ++countItems;
        tr.appendChild(td);

        td = document.createElement('td');
        td.textContent = shop_items[id[2]].name;
        tr.appendChild(td);

        td = document.createElement('td');
        td.id = "id_count_" + event.target.id;
        td.textContent = 1;
        tr.appendChild(td);

        td = document.createElement('td');
        td.textContent = shop_items[id[2]].cost;
        tr.appendChild(td);

        shop_items[id[2]].count++;
    }
    else {
        shop_items[id[2]].count++;
        var x = document.getElementById("id_count_" + event.target.id);
        x.innerText = shop_items[id[2]].count;
    }

    for (i=0; i<shop_items.length;i++) {
        sum += shop_items[i].count * shop_items[i].cost;
    }

    var y = document.getElementById('result');
    y.innerText = sum;
    sum = 0;
}

function clickImg(event) {
    var div = document.getElementById("big_img"),
        id = event.target.id.split("_"),
        span = document.createElement("span");
    // img.setAttribute("src", shop_items[id[2]].big_img);
    div.setAttribute("style", "text-align: center;");
    if (shop_items[id[2]].big_img == "") {
        div.textContent = "Фотографии не найдено!";
    } else {
        // div.removeChild(span);
        div.textContent = "";
        div.setAttribute("style", "background: url(" + shop_items[id[2]].big_img + ") no-repeat; height: 450px; background-size: contain; background-position:center;");
    }
}

window.onload = init;