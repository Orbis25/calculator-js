var total = 0;

document.addEventListener('DOMContentLoaded', function (e) {
    e.preventDefault();
    var history = GetLocalStorage();

    history.forEach(element => {
        var container = document.getElementById('list');
        var list = document.createElement('li');
        list.textContent = element;
        container.appendChild(list);
    });
})

var btn = document.getElementById('clear-history');
btn.addEventListener('click', eliminarLocalStorage);

function eliminarLocalStorage() {
    var yes = confirm('Seguro que desea eliminar el historial?');
    if (yes) {
        localStorage.clear();
        alert('Historial Eliminado');
        location.reload();
    } else {
        alert('Operacion cancelada');
    }
}

function valores(value) {
    document.getElementById('resultado').value += value;
}

function CE(value) {
    var result = document.getElementById('resultado');
    console.log
    switch (value) {
        case 1:
            result.value = '';
            break;
        case 2:
            result.value = result.value.substring(0, result.value.length - 1)
            result.textContent = result.value;
            break;
    }
}

function Calculos(value) {
    var result = document.getElementById('resultado');
    result.value += value;
}

function Total() {
    var result = document.getElementById('resultado');
    var operation = result.value;
    if (result.value != '') {
        total = eval(result.value);
        if (result.value != total) {
            result.value = total.toFixed(2);
            AddDom(result.value, operation);
        }
    }
}

//agregandolos al Dom
function AddDom(value, operation) {

    var history = document.getElementById('list');
    var list = document.createElement('li');
    list.textContent = '' + operation + ' = ' + value;
    history.appendChild(list);

    var op = '' + operation + ' = ' + value;
    AddLocalStorage(op);
}

//agragar al localStorage
function AddLocalStorage(value) {
    var local = GetLocalStorage();
    local.push(value);
    localStorage.setItem('history', JSON.stringify(local));
}

//obtener del localStorage
function GetLocalStorage() {
    var data;
    if (localStorage.getItem('history') == null || localStorage.getItem('history') == undefined) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem('history'));
    }
    return data;
}