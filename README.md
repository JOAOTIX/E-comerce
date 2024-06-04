# E-comerce - JavaScript

## Descripción

Este proyecto es una simulación de una página web donde puedas comprar productos, contiene 3 páginas web las cuales son: Inicio, Catalogo y Contacto. 

## Características

- **Agregar Productos al carrito**: Los usuarios pueden agregar una cantidad de 10 unidades de un mismo producto(Solo se te permite 10 por productos y debes de seleccionar una talla en especifica si no seleccionas te mandara una alerta avisandote, en caso quieras agregar más de 10 productos o quiera ingreasar otro numero mayor de 10 y menor que 0 te coloca 10 o 1 según los digitos que ingreses).
- **Agregar Productos desde el carrito**: Los usuarios puedes agregar productos de 1 en 1 desde el carrito de compras
- **Comprar Producto**: Los usuarios pueden compra via Whatsapp(No se puede comprar si el carrito de compras esta vacio, si tratas de comprar te mandara una alerta).
- **Caracteristicas Producto**: Los usuarios cuando le dan al boton especificaciones pueden ver las caracteristicas de un producto en especifico(Hará una animacion de voltear la carta y te mostrara la descripción del producto).
- **Eliminar productos desde el carrito**: Los usarios pueden eliminar los productos de 1 en 1 desde el carrito de compras
- **Vaciar carrito**: Los usuarios pueden eliminar todos los productos del carrito(Si el carrito esta vacio y tratas de vaciarlo te mandara una alerta avisandote).
- **Ver carrito**: Los usuarios pueden ver los productos en su carrito, con la cantidad, nombre del producto, talla, precio e imagen.
- **Alertas**: Alertas interactivas que notifican al usuario sobre las acciones realizadas (agregar, eliminar, vaciar y restricciones).
- **Carrousel de imagenes de los productos**: Los usuarios pueden ver como las imagenes de los productos van cambiando automaticamente(Si pasan el mouse por encima la imagen se detiene)
- **Carrousel en la página de bienvenida**: Los usuarios ven imagenes que se mueven solas(Se detienen si pasan el mouse por encima) 

## Tecnologías Utilizadas

- **JavaScript**: Para la lógica y control de la aplicación.
- **Bootstrap**: Para el diseño y estilo de la interfaz de usuario.
- **jQuery**: Para manipulaciones DOM adicionales.
- **JSON**: Para el almacenamiento de los datos de los productos(Imagenes, nombre, descripcion y precio)
- **Font Awesome**: Para iconos en los botones y enlaces.
- **HTML5 y CSS3**: Para la estructura y el estilo básico de la página.

## Estructura del Proyecto

- `index.html`: Archivo principal que nos muestra de que trata la marca y algunas imagenes de sus productos(En este caso los datos son para relleno, se puede cambiar con datos reales según se requiera).
- `catalogo.html`: Archivo que nos muestra los productos y las funcionalidades(Los productos son inventados, se puede cambiar por datos reales según se requiera).
- `contacto.html`: Archivo que contiene las redes sociales de la página web(En este caso estan mis datos, se puede cambiar por otros datos según se requiera).
- `js/script.js`: Logica de las funcionalidades del archivo `catalogo.html`(Agregar al carrito, Vaciar carrito, Comprar en Whastapp,etc).
- `css/style.css`: Archivo de estilos CSS personalizados para el archivo `index.html`.
- `css/catalogo.css`: Archivo de estilos CSS personalizados para el archivo `catalogo.html`.
- `css/contacto.css`: Archivo de estilos CSS personalizados para el archivo `contacto.html`.
- `productos/productos.json`: Archivo JSON que contiene los datos de los productos(Imagenes, nombre, descripcion y precio).
- `logo.jpg`: Mi logo.
- `README.md`: Este archivo.

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/JOAOTIX/E-comerce.git
2. **Abrir el archivo index.html**:
  Puedes abrir el archivo index.html directamente en tu navegador web.

3.**Asegurarte de tener acceso a Internet**:
  La aplicación requiere acceso a Internet para cargar las bibliotecas externas (jQuery, Bootstrap, Font Awesome).

## Uso
- **Agregar Productos:** Ingresa la cantidad que quieras agregar con un máximo de 10 y minimo de 1 además selecciona la talla
- **Agregar Productos desde el carrito:** Agregas los productos de 1 en 1 con el boto de icono de cruz en el carrito
- **Eliminar Productos:** Elimina los productos de 1 en 1 con el boton de icono de tacho de basura en el carrito
- **Vaciar Carrito:** Haz clic en el botón "Vaciar carrito" para eliminar todos los productos de tu carrito
- **Comprar en Whatsapp:** Haz clic en el botón "Comprar en Whastapp" Para ir con todos tus productos a un chat.

## Autor

**Joao Urteaga Sánchez**

- [GitHub](https://github.com/JOAOTIX)
- [LinkedIn](https://www.linkedin.com/in/joao-urteaga-s%C3%A1nchez-a9989526b)
- [Email](mailto:joaourteaga52@gmail.com)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
