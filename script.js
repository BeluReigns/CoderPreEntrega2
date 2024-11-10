function programaPrincipal() {

    const productos = [
        {id: 1, nombre: "polera roja", genero: "femenino", talla: "S", precio: 5900,stock: 10, departamento: "vestimenta"},
        {id: 3, nombre: "polera estrella", genero: "femenino", talla: "M", precio: 5500, stock: 2, departamento: "vestimenta"},
        {id: 4, nombre: "polera blanca", genero: "femenino", talla: "M", precio: 10000, stock: 7, departamento: "deportes"},
        {id: 7, nombre: "peto a", genero: "femenino", talla: "S", precio: 4500, stock: 10, departamento: "deportes"},
        {id: 9, nombre: "paletas de ping pong", genero: "unisex", talla: "NO APLICA", precio: 3500, stock: 15, departamento: "deportes"},
        {id: 10, nombre: "falda roja", genero: "femenino", talla: "L", precio: 5900, stock: 43, departamento: "vestimenta"},
        {id: 13, nombre: "pañuelo a", genero: "unisex", talla: "NO APLICA", precio: 12000, stock: 5, departamento: "vestimenta"},
        {id: 14, nombre: "peto a", genero: "femenino", talla: "M", precio: 2500, stock: 13, departamento: "deportes"},
        {id: 15, nombre: "pelotas de ping pong", genero: "unisex", talla: "NO APLICA", precio: 15000, stock: 21, departamento: "deportes"},
        {id: 17, nombre: "falda estrella", genero: "femenino", talla: "M", precio: 5800, stock: 10, departamento: "vestimenta"},
        {id: 18, nombre: "polera roja", genero: "femenino", talla: "M", precio: 4800, stock: 4, departamento: "vestimenta"},
        {id: 19, nombre: "peto a", genero: "masculino", talla: "L", precio: 8900, stock: 52, departamento: "vestimenta"},
        {id: 21, nombre: "camiseta de basquet", genero: "masculino", talla: "XL", precio: 9800, stock: 10, departamento: "deportes"},
        {id: 22, nombre: "polera blanca", genero: "femenino", talla: "L", precio: 25000, stock: 0, departamento: "vestimenta"},
        {id: 25, nombre: "shorts a", genero: "masculino", talla: "S", precio: 5800, stock: 6, departamento: "vestimenta"},
        {id: 28, nombre: "camiseta de fútbol", genero: "masculino", talla: "M", precio: 13000, stock: 17, departamento: "deportes"},
        {id: 29, nombre: "muñequeras", genero: "unisex", talla: "S", precio: 6800, stock: 41, departamento: "deportes"},
        {id: 30, nombre: "mesa de ping pong", genero: "unisex", talla: "NO APLICA", precio: 85500, stock: 12, departamento: "deportes"}
    ]

    let carrito = []
    let idProducto
    let opcion
    do {
        opcion = opcionUsuario("Ingrese:\n1 - Agregar producto al carrito\n2- Filtrar por departamento\n3 - Filtrar por talla\n4 - Finalizar compra\n0 - Salir")
        switch (opcion) {
            case 1:
                idProducto = opcionUsuario("Selecciona un producto por ID\n" + listarProductos(productos))
                carrito = actualizarCarrito(carrito, productos, idProducto)
                break
            case 2:
                let departamento = prompt("Ingrese el departamento para filtrar productos:\n"
                    + obtenerPropiedad(productos, "departamento")).toLowerCase()
                let departamentosFiltrados = filtrarProductos(productos, "departamento", departamento)
                if (departamentosFiltrados.length === 0) {
                    alert("No se encontraron productos en el departamento seleccionado.")
                    break
                } 
                idProducto = opcionUsuario("Selecciona un producto por ID\n" + listarProductos(departamentosFiltrados))
                console.log(idProducto)
                carrito = actualizarCarrito(carrito, productos, idProducto)
                break
            case 3:
                let talla = prompt("Ingrese la talla que deseas buscar:\n" 
                    + obtenerPropiedad(productos, "talla")).toUpperCase()
                let tallasFiltradas = filtrarProductos(productos, "talla", talla)
                if (tallasFiltradas.length === 0) {
                    alert("No se encontraron productos de esa talla.")
                    break
                } 
                idProducto = opcionUsuario("Selecciona un producto por ID\n" + listarProductos(tallasFiltradas))
                carrito = actualizarCarrito(carrito, productos, idProducto)
                break
            case 4:
                if (carrito.length === 0) {
                    alert("Error. El carrito está vacío. Primero debes agregar productos.")
                } else {
                    let resumen = carrito.map(producto =>
                        `${producto.nombre} | Cantidad: ${producto.unidades} | Subtotal: $${producto.subtotal}`
                    ).join("\n")
                
                    let total = carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
                
                    alert("Resumen de su compra:\n" + resumen + `\nTotal: $${total}\n¡Gracias por su compra!`)
                    carrito = []
                }
                break
            case 0:
                alert("¡Gracias por visitar nuestra tienda!")
                break
            default:
                alert("Opción no válida, intente nuevamente.")
        }
    } while (opcion !== 0)
}

programaPrincipal()

// El usuario ingresará una opción varias veces  => función.
function opcionUsuario(mensaje) {
    return Number(prompt(mensaje))
} 

// Listar "todos" los productos de x lista
/*function listarProductos(lista) {
    return lista.map(producto => 
        ID: ${producto.id} | ${producto.nombre} | $${producto.precio} | Stock: ${producto.stock}
    ).join("\n");
}*/
function listarProductos(lista) {
    return lista.map(producto => "id: " + producto.id + ": " + producto.nombre + " $" + producto.precio).join("\n")
}

// FiltrarProductos(productos, "categoria"/propiedad, valorPropiedad)
function filtrarProductos(productos, propiedad, valorPropiedad) {
    return productos.filter(producto => producto[propiedad] === valorPropiedad)
}

// Obtener valores de una propiedad
function obtenerPropiedad(lista, propiedad) {
    let valoresPropiedad = []
    lista.forEach(valor => {
        if (valor[propiedad] && !valoresPropiedad.includes(valor[propiedad])) {
            valoresPropiedad.push(valor[propiedad]);
        }
    })
    return valoresPropiedad.join(", ")
}

// actualizar carrito 
function actualizarCarrito(carrito, productos, idProducto) {
    let productoBuscado = productos.find(producto => producto.id === idProducto)
    if (!productoBuscado) {
        alert("ID de producto no válido. Intente nuevamente.")
        return carrito; // Retorna el carrito sin cambios
    }
    let indiceProductoBuscado = carrito.findIndex(producto => producto.id === idProducto)
    // si encontró el idProducto ingresado por el usuario, sumá 1 a unidades y precio al subtotal
    if (indiceProductoBuscado !== -1) {
        carrito[indiceProductoBuscado].unidades++
        carrito[indiceProductoBuscado].subtotal = carrito[indiceProductoBuscado].precio *carrito[indiceProductoBuscado].unidades
    // si NO encontró el producto. Creo el producto/objeto "nuevo" en el carrito    
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            genero: productoBuscado.genero,
            talla: productoBuscado.talla,
            precio: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio // subtotal inicial si es el 1er producto en agregar al carrito
        })
    }
    return carrito
} 