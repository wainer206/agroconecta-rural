// ===============================
// CARGAR PRODUCTOS GUARDADOS
// ===============================
let products = JSON.parse(localStorage.getItem("products")) || [];

document.addEventListener("DOMContentLoaded", renderProducts);

// ===============================
// AGREGAR PRODUCTO
// ===============================
document.getElementById("productForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;
    const price = parseFloat(document.getElementById("price").value);

    const total = quantity * price;

    const product = { name, category, quantity, unit, price, total };

    products.push(product);

    saveProducts();
    renderProducts();
    this.reset();
});

// ===============================
// GUARDAR EN NAVEGADOR
// ===============================
function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

// ===============================
// MOSTRAR PRODUCTOS
// ===============================
function renderProducts(){
    const list = document.getElementById("productList");
    list.innerHTML = "";

    let grandTotal = 0;

    products.forEach((p, index) => {

        grandTotal += p.total;

        list.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
                <td>${p.unit}</td>
                <td>$ ${p.price.toLocaleString("es-CO")}</td>
                <td>$ ${p.total.toLocaleString("es-CO")}</td>
                <td class="no-print">
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    if(products.length > 0){
        list.innerHTML += `
            <tr class="table-success fw-bold">
                <td colspan="5" class="text-end">TOTAL GENERAL:</td>
                <td>$ ${grandTotal.toLocaleString("es-CO")}</td>
                <td class="no-print"></td>
            </tr>
        `;
    }
}

// ===============================
// ELIMINAR PRODUCTO
// ===============================
function deleteProduct(index){
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}

// ===============================
// IMPRIMIR SOLO INVENTARIO
// ===============================
function printInventory(){
    window.print();
}

// ===============================
// EXPORTAR PDF PROFESIONAL
// ===============================
function exportPDF(){

    let grandTotal = 0;

    let content = `
        <html>
        <head>
        <style>
            @page {
                size: letter;
                margin: 2.54cm;
            }
            body {
                font-family: Arial;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 16px;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: center;
            }
            th {
                background-color: #d4edda;
            }
            h2 {
                text-align: center;
            }
        </style>
        </head>
        <body>
        <h2>Inventario - AgroConecta Rural</h2>
        <table>
        <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Cantidad</th>
            <th>Unidad</th>
            <th>Precio</th>
            <th>Total</th>
        </tr>
    `;

    products.forEach(p => {
        grandTotal += p.total;
        content += `
            <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
                <td>${p.unit}</td>
                <td>$ ${p.price.toLocaleString("es-CO")}</td>
                <td>$ ${p.total.toLocaleString("es-CO")}</td>
            </tr>
        `;
    });

    content += `
        <tr>
            <td colspan="5"><strong>Total General</strong></td>
            <td><strong>$ ${grandTotal.toLocaleString("es-CO")}</strong></td>
        </tr>
        </table>
        </body>
        </html>
    `;

    const win = window.open('', '', 'width=900,height=700');
    win.document.write(content);
    win.document.close();
    win.print();
}
