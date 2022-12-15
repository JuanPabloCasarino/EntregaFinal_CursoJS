function pedirNombre() {
    let nombre = prompt("Dinos tu nombre:")
    alert("Bienvenido a nuestra tienda de camisetas " + nombre)
}

class camisetas {
    constructor(id, nombre, talle, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.talle = talle;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
    }
}

//Consulto los productos en el JSON
const consultarProductos = async () => {
    const response = await fetch("./json/productos.json")
    const productos = await response.json()
    return productos
}

// Agrego los elementos al DOM

consultarProductos().then(productos => {
    productos.forEach(producto => {
        divProductos.innerHTML +=
            '<div id="' + producto.id + '" class="card card-prod"><img height="300px" src="./assets/img/' + producto.imagen + '.png" class="card-img-top"> <div class="card-body"> <h4 class=card-title">' + producto.nombre + ' Talle: ' + producto.talle + '</h4> <p class="card-text">' + producto.precio + '</p> <button id=' + producto.id + ' class="btn btn-primary">Agregar</button> </div></div>'
    })
})
    const listaCamisetas = consultarProductos()
    console.log(listaCamisetas)

//Creo el array con los productos
// const listaCamisetas = [];
// listaCamisetas.push(new camisetas(1, "Camiseta Barca", "S", 1200, "camibar"));
// listaCamisetas.push(new camisetas(2, "Camiseta Barca", "M", 1260, "camibar"));
// listaCamisetas.push(new camisetas(3, "Camiseta Barca", "L", 1480, "camibar"));
// listaCamisetas.push(new camisetas(4, "Camiseta Real Madrid", "S", 1490, "camireal"));
// listaCamisetas.push(new camisetas(5, "Camiseta Real Madrid", "M", 1590, "camireal"));
// listaCamisetas.push(new camisetas(6, "Camiseta Real Madrid", "L", 1670, "camireal"));
// listaCamisetas.push(new camisetas(7, "Camiseta Bayern Munchen", "S", 1080, "camibay"));
// listaCamisetas.push(new camisetas(8, "Camiseta Bayern Munchen", "M", 1330, "camibay"));
// listaCamisetas.push(new camisetas(9, "Camiseta Bayern Munchen", "L", 1400, "camibay"));
// listaCamisetas.push(new camisetas(10, "Camiseta Man United", "S", 1200, "camimanu"));
// listaCamisetas.push(new camisetas(11, "Camiseta Man United", "M", 1550, "camimanu"));
// listaCamisetas.push(new camisetas(12, "Camiseta Man United", "L", 1600, "camimanu"));
// listaCamisetas.push(new camisetas(13, "Camiseta Juventus", "S", 1100, "camijuventus"));
// listaCamisetas.push(new camisetas(14, "Camiseta Juventus", "M", 1100, "camijuventus"));
// listaCamisetas.push(new camisetas(15, "Camiseta Juventus", "L", 1300, "camijuventus"));
// listaCamisetas.push(new camisetas(16, "Camiseta PSG", "S", 1000, "camipsg2"));
// listaCamisetas.push(new camisetas(17, "Camiseta PSG", "M", 1100, "camipsg2"));
// listaCamisetas.push(new camisetas(18, "Camiseta PSG", "L", 1230, "camipsg2"));

//Agregar elementos al Dom
// const divProductos = document.getElementById("divProductos")
// listaCamisetas.forEach(producto => {
//     divProductos.innerHTML +=
//         '<div id="' + producto.id + '" class="card card-prod"><img height="300px" src="./assets/img/'+producto.imagen+'.png" class="card-img-top"> <div class="card-body"> <h4 class=card-title">' + producto.nombre + ' Talle: ' + producto.talle + '</h4> <p class="card-text">' + producto.precio + '</p> <button id=' + producto.id + ' class="btn btn-primary">Agregar</button> </div></div>'
// })


//Carrito
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const botonAgregar = document.querySelectorAll(".btn-primary")

botonAgregar.forEach(boton => {
    boton.onclick = () => {
        const productoSeleccionado = listaCamisetas.find(prod => prod.id === parseInt(boton.id))

        const productosCarrito = {
            ...productoSeleccionado,
            cantidad: 1
        }

        const indexCarrito = carrito.findIndex(prod => prod.id === productosCarrito.id)
        if (indexCarrito === -1) {
            carrito.push(productosCarrito)
        } else {
            carrito[indexCarrito].cantidad += 1
        }
        //Agrego carrito a storage
        localStorage.setItem("carrito", JSON.stringify(carrito))

        Toastify({
            text: "El producto " + productosCarrito.nombre + " Talle: " + productosCarrito.talle + " ha sido agregado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function () {}
        }).showToast();

    }
})

//Boton finalizar total
const botonFinalizar = document.querySelector("#finalizar")
botonFinalizar.onclick = () => {
    const valores = carrito.map(prod => prod.precio * prod.cantidad)
    let totalCompra = 0
    valores.forEach(valor => {
        totalCompra += valor
    })

    let totalLlevar = "Vas a llevar: "
    for (itemsElegidos of carrito) {
        totalLlevar += "\n -" + itemsElegidos.nombre + " Talle " + itemsElegidos.talle
    }

    if (totalCompra === 0) {
        Swal.fire("Todavia no has comprado nada")
    } else {
        Swal.fire("Te muestro lo que tenes en el carrito: \n" + totalLlevar + "\n Por un total de " + totalCompra)
    }

}