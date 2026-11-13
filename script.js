function enviarWSP(mensaje) {
    const numero = "525540246668";

    const textoCodificado = encodeURIComponent(mensaje);

    const enlace = `https://api.whatsapp.com/send?phone=${numero}&text=${textoCodificado}`;

    window.location.href = enlace;
}

// BASE DE DATOS DE PRODUCTOS (10 productos o más por categoria)
const baseDatosProductos = {
    caguamas: [
        { nombre: "Caguama Tecate 1.2L", precio: "$40.00", desc: "La clásica cerveza clara bien fría y al mejor precio.", imagen: "imagenes/tecate.webp" },
        { nombre: "Caguama Indio 1.2L", precio: "$40.00", desc: "Cerveza oscura con gran cuerpo y sabor tradicional.", imagen: "imagenes/Indio.webp" },
        { nombre: "Caguama XX Lager 1.2L", precio: "$45.00", desc: "Cerveza tipo Vienna con excelente balance.", imagen: "imagenes/XX.webp" }
    ],
    azulitos: [
        { nombre: "Azulito Clásico 1L", precio: "$75.00", desc: "Preparado con vodka y el sabor de la casa.", imagen: "imagenes/azulito.jpeg" },
        { nombre: "Pitufo sin alcohol 1L", precio: "$75.00", desc: "Edición especial para compartir con los amigos.", imagen: "imagenes/azulito.jpeg" }
    ],
    cerillitos: [
        { nombre: "Cerillito Tecate 473 ml", precio: "$50.00", desc: "Preparación especial de la casa, refrescante.", imagen: "imagenes/cerillito1.jpeg" },
        { nombre: "Cerillito Indio 473 ml", precio: "$50.00", desc: "Con un toque extra de cítricos y sal sin exagerar.", imagen: "imagenes/cerillito2.jpeg" },
        { nombre: "Cerillito XX Lager 473 ml", precio: "$50.00", desc: "Para disfrutar en reuniones familiares sin exceso", imagen: "imagenes/cerillito3.jpeg" }
    ],
    latas: [
        { nombre: "Laton 710 ml", precio: "$36.00", desc: "Lata individual o más.", imagen: "imagenes/lataindio.webp" },
        { nombre: "XX Lager 473 ml", precio: "$26.00", desc: "Cerveza importada en lata.", imagen: "imagenes/xxlata.webp" },
        { nombre: "Tecate 473 ml", precio: "$25.00", desc: "Llévala bien fría.", imagen: "imagenes/tecatelata.webp" },
        { nombre: "Indio 473 ml", precio: "$25.00", desc: "Obscura por naturaleza.", imagen: "imagenes/lataindio.webp" },
        { nombre: "Sol mezclas clamato 473 ml", precio: "$28.00", desc: "bebida refrescante.", imagen: "imagenes/clamato.webp" },
        { nombre: "Sol mezclas mangoyada 473 ml", precio: "$28.00", desc: "Sábor que te encantará.", imagen: "imagenes/mangoyada.webp" },
        { nombre: "Sol mezclas chelada 473 ml", precio: "$28.00", desc: "Hagámos nuestras mejores fiestas.", imagen: "imagenes/cheladas.webp" }
    ],
    micheladas: [
        { nombre: "Michelada natural", precio: "$65.00", desc: "Escarchada con sal, limón, y sabores caseros.", imagen: "imagenes/miche1.jpeg" },
        { nombre: "Michelada Ajonjolí", precio: "$75.00", desc: "Escarchado refrescante y natural delicioso.", imagen: "imagenes/miche2.jpeg" },
        { nombre: "Michelada pikín", precio: "$75.00", desc: "Escarchado especial con dulce y picante.", imagen: "imagenes/miche2.jpeg" }
    ],
    cuartitos: [
        { nombre: "Cuartito tecate 1pza. 190 ML", precio: "$10.00 C/U", desc: "Promoción por tiempo limitado.", imagen: "imagenes/tecatitas.webp" },
        { nombre: "Cuartito XX 1pza. 190 ML", precio: "$10.00 C/U", desc: "Precio sujeto a cambio.", imagen: "imagenes/xxsitas.webp" },
        { nombre: "Cuartito indio 1pza. 190 ML", precio: "$10.00 C/U", desc: "Envase retornable", imagen: "imagenes/indiocitas.webp" }
    ]
};

function abrirCatalogo(categoria) {
    const contenedor = document.getElementById('listaProductosDetalle');
    const tituloModal = document.getElementById('modalCatalogoLabel');
    contenedor.innerHTML = '';

    const productos = baseDatosProductos[categoria] || [];
    tituloModal.textContent = "Variedad de " + categoria.toUpperCase();

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted py-4">No hay productos registrados en esta categoría por el momento.</p>';
    } else {
        productos.forEach(prod => {
            const cardHTML = `
                <div class="col-md-6">
                    <div class="d-flex align-items-center bg-white p-3 rounded-3 shadow-sm border h-100">
                        <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 75px; height: 75px; object-fit: cover;" class="rounded-3 me-3">
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-1" style="color: #4a2e1b;">${prod.nombre}</h6>
                            <p class="text-muted small mb-1">${prod.desc}</p>
                            <strong class="d-block mb-2" style="color: #d97706;">${prod.precio}</strong>
                            <a href="#" onclick="enviarWSP('Hola, me interesa pedir ${prod.nombre} (${prod.precio})'); return false;" class="btn btn-sm btn-success py-1 px-3 fw-bold" style="font-size: 11px;">Pedir por WhatsApp</a>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += cardHTML;
        });
    }

    var modal = new bootstrap.Modal(document.getElementById('modalCatalogo'));
    modal.show();
}

document.addEventListener('DOMContentLoaded', function () {
    const buscador = document.getElementById('buscador');
    const formulario = document.getElementById('formBuscador');
    const productos = document.querySelectorAll('.product-item');

    function buscarProductos() {
        const texto = buscador.value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        let encontrados = 0;

        productos.forEach(producto => {
            const contenido = producto.textContent
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const coincide = contenido.includes(texto);
            producto.style.display = coincide ? "" : "none";

            if (coincide) {
                encontrados++;
            }
        });

        return encontrados;
    }

    buscador.addEventListener('input', buscarProductos);

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        const encontrados = buscarProductos();

        if (encontrados > 0) {
            document.getElementById('productos').scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            alert('No encontramos productos con ese nombre. Intenta otra búsqueda.');
        }
    });
});
