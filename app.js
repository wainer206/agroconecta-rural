// Cargar productos guardados o iniciar vacío
let products = JSON.parse(localStorage.getItem("products")) || [];

// Cuando la página carga, mostrar productos guardados
document.addEventListener("DOMContentLoaded", renderProducts);

// Agregar producto
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

// Guardar en localStorage
function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

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
                <td>
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
                <td></td>
            </tr>
        `;
    }
}

function deleteProduct(index){
    products.splice(index, 1);
    saveProducts();
    renderProducts();
}
