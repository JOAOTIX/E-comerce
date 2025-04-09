// Funcion para cargar los productos y mostrarlos
function cargarProductos() {
  fetch('../productos/productos.json')
    .then(response => response.json())
    .then(productos => {
      const productosContainer = document.getElementById('productos-container');
      const row = document.createElement('div');
      row.classList.add('row');

      productos.forEach((producto, index) => {
        const col = document.createElement('div');
        col.classList.add('col-md-6', 'col-lg-3', 'mb-4');

        const card = document.createElement('div');
        card.classList.add('flip-card');

        const carouselId = `carousel-${index}`;

        card.innerHTML = `
          <div class="flip-card-inner">
            <div class="flip-card-front card" id="cuerpo-carta">
              <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="1000" data-bs-pause="false">
                <div class="carousel-inner">
                  ${producto.imagen.map((imagen, imgIndex) => `
                    <div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
                      <img src="${imagen}" class="d-block w-100" alt="${producto.nombre}">
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="card-body poetsen-one-regular cartas">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p>Precio: S/${producto.precio}</p>
               <div class="tallas">
                  <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="talla-${producto.nombre}" id="talla-s-${producto.nombre}" value="S">
                      <label class="form-check-label" for="talla-s-${index}">
                         S
                   </label>
                  </div>
                  <div class="form-check form-check-inline ms-md-auto">
                   <input class="form-check-input" type="radio" name="talla-${producto.nombre}" id="talla-m-${producto.nombre}" value="M">
                      <label class="form-check-label" for="talla-m-${index}">
                       M
                      </label>
                  </div>
               </div>
                <label for="cantidad-${producto.nombre}">Cantidad:</label>
                <input type="number" id="cantidad-${producto.nombre}" placeholder="Max. 10 por cliente" min="1" max="10" class="form-control mb-3" oninput="this.value = Math.max(1, Math.min(10, parseInt(this.value)))"  required />

                <button class="btn btn-outline-info text-black" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}')">Agregar al Carrito<i class="fas fa-shopping-cart ms-2"></i></button>
                <button class="btn btn-outline-info text-black" onclick="voltearCarta(this)">Especificaciones<i class="fas fa-info-circle ms-2"></i></button>
              </div>
            </div>
            <div class="flip-card-back card">
              <div class="card-body">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <button class="btn btn-outline-info text-black" onclick="voltearCarta(this)">Volver<i class="fas fa-undo ms-2"></i></button>
              </div>
            </div>
          </div>
        `;

        col.appendChild(card);
        row.appendChild(col);
      });

      productosContainer.appendChild(row);

      // Llamar a la función para iniciar los carruseles sin botones de control
      iniciarCarruseles();
  });
}

// Función para iniciar los carruseles sin botones de control
function iniciarCarruseles() {
const carruseles = document.querySelectorAll('.carousel');
carruseles.forEach(carrusel => {
    const carouselInstance = new bootstrap.Carousel(carrusel, {
        interval: 5000, // Intervalo de 2 segundos entre cada movimiento del carrusel
        pause: 'hover', // Pausar el carrusel cuando el mouse está sobre él
        wrap: true, // Volver al primer slide después de llegar al último
        keyboard: true // Permitir navegación por teclado
    });
});
}

  function voltearCarta(button) {
    const cardInner = button.closest('.flip-card-inner');
    cardInner.classList.toggle('flipped');
  }
  
  
 
  
let carrito = [];
const MAX_PRODUCTOS = 10;
//Esta funcion nos permite agregar productos a nuestro carrito de compras en la cual recibimos el parametro de nombre y precio ademas de parciar la cantidad para
//poder usarla y añadirla en nuestro carrito que nos permitira mostrar con nuestra funcion "mostrarCarrito();"
function agregarAlCarrito(nombre, precio, imagen) {
  const cantidadInput = document.getElementById(`cantidad-${nombre}`);
  let cantidad = parseInt(cantidadInput.value);

  const radios = document.querySelectorAll(`input[name="talla-${nombre}"]:checked`);
  
  // Verificar si al menos una talla está seleccionada
  if (radios.length === 0) {
      mostrarAlerta('<i class="fas fa-exclamation-circle me-2"></i>Debes seleccionar al menos una talla antes de agregar al carrito.', 'warning');
      return;
  }

  // Obtener la talla seleccionada
  const tallaSeleccionada = radios[0].value;

  // Verificar si la talla es "S" o "M"
  if (tallaSeleccionada !== 'S' && tallaSeleccionada !== 'M') {
      mostrarAlerta('<i class="fas fa-exclamation-circle me-2"></i>La talla seleccionada no es válida.', 'warning');
      return;
  }

  // Verificar si la cantidad total del producto excede el límite de 10 unidades
  const cantidadTotalProducto = carrito.reduce((total, item) => (item.nombre === nombre) ? total + item.cantidad : total, 0);
  if (cantidadTotalProducto + cantidad > 10) {
      mostrarAlerta(`<i class="fas fa-exclamation-circle me-2"></i>No puedes agregar más de 10 unidades del producto ${nombre} en total.`, 'warning');
      return;
  }

  const productoExistente = carrito.find(item => item.nombre === nombre && item.talla === tallaSeleccionada);

  if (productoExistente) {
      productoExistente.cantidad += cantidad;
      if(cantidad>1){
        mostrarAlerta(`<i class="fas fa-sync-alt fa-spin me-2"></i>Se añadieron ${cantidad} unidades más del producto ${nombre} con talla ${tallaSeleccionada} al carrito exitosamente.`, 'info');
      }else{
        mostrarAlerta(`<i class="fas fa-sync-alt fa-spin me-2"></i>Se añadio ${cantidad} unidad más del producto ${nombre} con talla ${tallaSeleccionada} al carrito exitosamente.`, 'info');
      }
  } else {
      const item = {
          nombre: nombre,
          talla: tallaSeleccionada,
          cantidad: cantidad,
          precio: precio,
          imagen: imagen // Agregar la ruta de la imagen del producto al objeto del carrito
      };
      carrito.push(item);
      if(cantidad>1){
        mostrarAlerta(`<i class="fas fa-check-circle me-2"></i>${cantidad} unidades del producto ${nombre} con talla ${tallaSeleccionada} agregadas al carrito correctamente.`, 'success');
      }else{
        mostrarAlerta(`<i class="fas fa-check-circle me-2"></i>${cantidad} unidad del producto ${nombre} con talla ${tallaSeleccionada} agregada al carrito correctamente.`, 'success');
      }
  }

  mostrarCarrito(); // Llamar a la función para mostrar el carrito después de agregar el producto
}
//Esta funcion mostramos el producto que haya sido agregado al carrito, en el cual mostramos el nombre, cantidad y precio de cada uno ademas de añadirle 2 botones
//que nos permiten eliminar y agregar la cantidad del producto que este seleccionado y ademas nos permite mostrar un mensaje de carrito vacio en caso de que 
//no exista algun producto en nuestro carrito de compras
// Función para mostrar el carrito en el HTML
function mostrarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  listaCarrito.innerHTML = '';

  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    
    // Crear elemento de imagen
    const img = document.createElement('img');
    img.src = item.imagen; // Asignar la ruta de la imagen del producto
    img.alt = item.nombre; // Establecer el atributo alt de la imagen
    img.classList.add('carrito-imagen'); // Agregar una clase CSS para estilizar la imagen si es necesario
    li.appendChild(img); // Agregar la imagen al elemento de la lista del carrito
    
    // Agregar detalles del producto (nombre, cantidad, talla, precio)
    const detallesProducto = document.createElement('div');
    detallesProducto.innerHTML = `
      <span>${item.nombre}</span>
      <span>Cantidad: ${item.cantidad}</span>
      <span>Talla: ${item.talla}</span>
      <span>Precio unitario: S/${item.precio}</span>
    `;
    li.appendChild(detallesProducto);
    
    // Agregar botones para incrementar cantidad y eliminar producto
    const botonAgregar = document.createElement('button');
    botonAgregar.classList.add('btn', 'btn-outline-success', 'mx-2');
    botonAgregar.innerHTML = '<i class="fas fa-plus"></i>';
    botonAgregar.onclick = () => incrementarCantidad(index);

    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn', 'btn-outline-danger', 'mx-2');
    botonEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    botonEliminar.onclick = () => eliminarProducto(index);

    li.appendChild(botonAgregar);
    li.appendChild(botonEliminar);
    
    listaCarrito.appendChild(li);

    const subtotal = item.cantidad * item.precio;
    total += subtotal;
  });

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total: S/${total}`;

  const mensajeCarritoVacio = document.getElementById('carrito-vacio');
  if (carrito.length === 0) {
    mensajeCarritoVacio.style.display = 'block';
  } else {
    mensajeCarritoVacio.style.display = 'none';
  }
}
//Con esta funcion podemos incrementar la cantidad de nuestro producto de 1 en 1 
function incrementarCantidad(index) {
    if (carrito[index].cantidad < MAX_PRODUCTOS) {
        carrito[index].cantidad += 1;
        mostrarAlerta('<i class="fas fa-check-circle me-2"></i>Cantidad aumentada correctamente.')
        mostrarCarrito();
    } else {
        mostrarAlerta(`<i class="fas fa-exclamation-circle me-2"></i>No puedes agregar más de ${MAX_PRODUCTOS} productos de ${carrito[index].nombre}.`, 'warning');
    }
}
//Con esta funcion eliminamos cada cantidad que exista de nuestro producto
function eliminarProducto(index) {
    const producto = carrito[index];

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }

    mostrarAlerta('  <i class="fas fa-trash me-2"></i>Producto eliminado exitosamente.', 'danger');
    mostrarCarrito();
}
//Esta funcion nos sirve para vaciar nuestro carrito con el boton de vaciar carrito
function vaciarCarrito() {
    if (carrito.length > 0) {
        carrito = [];
        mostrarAlerta('<i class="fas fa-broom me-2"></i>Carrito completamente limpio.', 'info');
        mostrarCarrito();
    } else {
        mostrarAlerta('<i class="fas fa-ban me-2"></i>No puedes eliminar un carrito vacio, porfavor agrega productos.', 'danger');
    }
       // Esperar 2 segundos antes de cerrar automáticamente el carrito
       setTimeout(() => {
        const offcanvasElement = document.getElementById('offcanvasExample');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        offcanvas.hide();
    }, 2000);
}
//Esta funcion hace que cuando nuestro usuario presione el boto de comprar en whatsapp del carrito lo rediriga con un mensaje predeterminado a un chat en especifico
//en el cual el mensaje muestra los nombres de los productos, cantidad y el monto total de todos ello
function redirigirAWhatsApp() {
  if (carrito.length === 0) {
      mostrarAlerta('<i class="fas fa-exclamation-circle me-2"></i>El carrito está vacío. Por favor, agrega productos al carrito para poder comprar.', 'warning');
      return;
  } else {
      let mensaje = 'Hola, vengo de la página web y deseo estos productos:\n';

      carrito.forEach((item, index) => {
          mensaje += `${item.nombre}, Talla: ${item.talla}, Cantidad: ${item.cantidad}\n`;
      });

      const montoTotal = carrito.reduce((total, item) => {
          return total + (item.cantidad * item.precio);
      }, 0);

      mensaje += `El monto total es: S/${montoTotal}\n¿Me brindas más información?`;

      const telefono = '+51993839625'; // Número de teléfono 
      const whatsappLink = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
      window.open(whatsappLink, '_blank');
      carrito = [];
  }
  mostrarCarrito();
}
//Esta funcion nos sirve para mostrar nuestra alerta en la cual usamos un modal pero lo tapamos con la alerta, esta recibe 2 parametros, el mensaje de la alerta
//y el color de que queremos que sea la alerta ademas de añadimos un tiempo de desvanecimiento despues de 2 segundos
function mostrarAlerta(mensaje, tipo = 'success') {
    const alertContainer = document.getElementById('alert-container');
    
    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
        </div>
    `;
    

    const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
    alertModal.show();

    // Cerrar la alerta automáticamente después de 2 segundos
    setTimeout(() => {
        alertModal.hide();
    }, 2000);
}
// Event listener para cargar los productos cuando el DOM esté completamente cargado
  document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
  });
document.addEventListener('DOMContentLoaded', mostrarCarrito);
document.getElementById('offcanvasExample').addEventListener('show.bs.offcanvas', mostrarCarrito);
