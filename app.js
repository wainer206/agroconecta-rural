document.addEventListener("DOMContentLoaded", function () {

    // LOGIN SIMULADO
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email === "productor@agro.com" && password === "1234") {
                alert("Ingreso exitoso");
                window.location.href = "dashboard.html";
            } else {
                alert("Correo o contraseña incorrectos");
            }
        });
    }

    // SISTEMA DE PRODUCTOS
    const productForm = document.getElementById("productForm");
    const productList = document.getElementById("productList");

    let products = [];

    if (productForm) {
        productForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("productName").value;
            const quantity = document.getElementById("productQuantity").value;
            const price = document.getElementById("productPrice").value;

            const product = { name, quantity, price };
            products.push(product);

            renderProducts();

            productForm.reset();
        });
    }

    function renderProducts() {
        productList.innerHTML = "";

        products.forEach((product, index) => {
            productList.innerHTML += `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.price}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    }

    window.deleteProduct = function (index) {
        products.splice(index, 1);
        renderProducts();
    };

});