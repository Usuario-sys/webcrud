document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-producto");
    const listaProductos = document.getElementById("lista-productos");
    const seccionAgregar = document.getElementById("seccion-agregar-producto");
    const seccionInventario = document.getElementById("seccion-ver-inventario");

    const submenu = document.querySelector(".menu-principal");
    const submenuOpciones = document.querySelector(".submenu-opciones");

    // Menú lateral desplegable
    submenu.addEventListener("click", () => {
        submenuOpciones.style.display = submenuOpciones.style.display === "block" ? "none" : "block";
    });

    document.getElementById("agregar-producto").addEventListener("click", () => {
        seccionAgregar.style.display = "block";
        seccionInventario.style.display = "none";
    });

    document.getElementById("ver-inventario").addEventListener("click", () => {
        seccionAgregar.style.display = "none";
        seccionInventario.style.display = "block";
    });

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById("nombre").value;
        const cantidad = document.getElementById("cantidad").value;
        const precio = document.getElementById("precio").value;

        agregarProducto(nombre, cantidad, precio);
        formulario.reset();
    });

    function agregarProducto(nombre, cantidad, precio) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="nombre">${nombre}</td>
            <td class="cantidad">${cantidad}</td>
            <td class="precio">$${precio}</td>
            <td>
                <button class="editar">✏️</button>
                <button class="guardar" style="display: none;">💾</button>
                <button class="eliminar">🗑️</button>
            </td>
        `;

        // Evento para eliminar
        fila.querySelector(".eliminar").addEventListener("click", () => fila.remove());

        // Evento para editar
        fila.querySelector(".editar").addEventListener("click", () => {
            editarProducto(fila);
        });

        // Evento para guardar cambios
        fila.querySelector(".guardar").addEventListener("click", () => {
            guardarEdicion(fila);
        });

        listaProductos.appendChild(fila);
    }

    function editarProducto(fila) {
        const nombreCelda = fila.querySelector(".nombre");
        const cantidadCelda = fila.querySelector(".cantidad");
        const precioCelda = fila.querySelector(".precio");
        const editarBtn = fila.querySelector(".editar");
        const guardarBtn = fila.querySelector(".guardar");

        // Convertimos las celdas en inputs editables
        nombreCelda.innerHTML = `<input type="text" value="${nombreCelda.textContent}">`;
        cantidadCelda.innerHTML = `<input type="number" value="${cantidadCelda.textContent}">`;
        precioCelda.innerHTML = `<input type="number" value="${precioCelda.textContent.replace("$", "")}">`;

        // Ocultamos el botón de editar y mostramos el de guardar
        editarBtn.style.display = "none";
        guardarBtn.style.display = "inline-block";
    }

    function guardarEdicion(fila) {
        const nombreInput = fila.querySelector(".nombre input");
        const cantidadInput = fila.querySelector(".cantidad input");
        const precioInput = fila.querySelector(".precio input");
        const editarBtn = fila.querySelector(".editar");
        const guardarBtn = fila.querySelector(".guardar");

        // Guardamos los valores y restauramos el diseño de la tabla
        fila.querySelector(".nombre").innerHTML = nombreInput.value;
        fila.querySelector(".cantidad").innerHTML = cantidadInput.value;
        fila.querySelector(".precio").innerHTML = `$${precioInput.value}`;

        // Volvemos a mostrar el botón de editar y ocultamos el de guardar
        editarBtn.style.display = "inline-block";
        guardarBtn.style.display = "none";
    }
});
