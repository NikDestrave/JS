var buttons = document.getElementsByTagName("input");
var img = document.getElementsByTagName("img");
var countItems = 0;

for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = clickFunction;
}

for (var a = 0; a < img.length; a++) {
    img[i].onclick = imgF;
}

function clickFunction(event) {
    var table = document.getElementById("shop_items"),
        tr = document.createElement('tr'),
        td = document.createElement('td'),
        id = event.target.id;
    table.appendChild(tr);
    td.innerText = ++countItems;
    tr.appendChild(td);
    td = document.createElement('td');
    var tg = document.getElementById("x" + id).innerText;
    td.innerText = tg;
    tr.appendChild(td);
    td = document.createElement('td');
    td.innerText = 1;
    tr.appendChild(td);
    switch (id) {
        case 1:
            td = document.createElement('td');
            td.innerText = 32000;
            tr.appendChild(td);
            break;
        case 2:
            td = document.createElement('td');
            td.innerText = 24000;
            tr.appendChild(td);
            break;
        case 3:
            td = document.createElement('td');
            td.innerText = 17000;
            tr.appendChild(td);
            break;
    }
}

function imgF(event) {
    var big_img = document.getElementById("big_img"),
        id = event;
    console.log(id);
}