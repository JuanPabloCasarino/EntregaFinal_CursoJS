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

// Agrego los elementos al DOM y doy funcionalidad al boton agregar

const listaCamisetas = []
const divProductos = document.getElementById("divProductos")

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

consultarProductos().then(productos => {
    
    const listaCamisetas = productos
    productos.forEach(producto => {
        divProductos.innerHTML +=
            '<div id="' + producto.id + '" class="card card-prod"><img height="300px" src="./assets/img/' + producto.imagen + '.png" class="card-img-top"> <div class="card-body"> <h4 class=card-title">' + producto.nombre + ' Talle: ' + producto.talle + '</h4> <p class="card-text">' + producto.precio + '</p> <button id=' + producto.id + ' class="btn btn-primary">Agregar</button> </div></div>'
    })

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
        totalLlevar += "\n -" + itemsElegidos.nombre+ " Talle " + itemsElegidos.talle+ ", cantidad: " + itemsElegidos.cantidad 
    }

    if (totalCompra === 0) {
        Swal.fire("Todavia no has comprado nada")
    } else {
        Swal.fire("Te muestro lo que tenes en el carrito: \n" + totalLlevar + "\n Por un total de " + totalCompra)
    }

}