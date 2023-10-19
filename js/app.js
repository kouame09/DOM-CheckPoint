// Récupérer les éléments HTML nécessaires
const allProducts = document.getElementById('all_products');
const nameProductInput = document.getElementById('name_product');
const priceProductInput = document.getElementById('price_product');
const addButton = document.getElementById('add_button');
const totalDisplay = document.getElementById('total_display');

// Fonction pour calculer le total
function calculateTotal() {
    const subtotals = document.querySelectorAll('.subtotal');
    let total = 0;
    subtotals.forEach(subtotal => {
        total += parseFloat(subtotal.textContent);
    });
    totalDisplay.textContent = total + ' fr cfa';
}

// Fonction pour ajouter un article
function addProduct() {
    const name = nameProductInput.value;
    const price = parseFloat(priceProductInput.value);

    if (!name || isNaN(price)) {
        alert('Veuillez saisir un nom d\'article valide et un prix valide.');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="article--name">
            <div style="margin-right:1rem"></div>
            <div><h3>${name}</h3> <a class="remove" id="1" onclick="removeProduct(this)">Supprimer</a></div>
        </td>
        <td class="quantity">
            <button class="qty-minus" id="1" onclick="decreaseQuantity(this)">-</button>
            <input type="text" readonly placeholder="Unit price" class="qty" value="1">
            <button class="qty-plus" id="1" onclick="increaseQuantity(this)">+</button>
        </td>
        <td class="price">${price} fr</td>
        <td class="subtotal">${price} fr</td>
    `;

    allProducts.appendChild(newRow);

    // Effacer les champs d'entrée
    nameProductInput.value = '';
    priceProductInput.value = 5000;

    calculateTotal();
}

// Fonction pour supprimer un article
function removeProduct(element) {
    const row = element.closest('tr');
    row.remove();
    calculateTotal();
}

// Fonction pour augmenter la quantité
function increaseQuantity(element) {
    const qtyInput = element.parentElement.querySelector('.qty');
    const price = parseFloat(element.parentElement.nextElementSibling.textContent);
    const subtotalElement = element.parentElement.nextElementSibling.nextElementSibling;
    let quantity = parseInt(qtyInput.value);
    quantity++;
    qtyInput.value = quantity;
    subtotalElement.textContent = price * quantity + ' fr';
    calculateTotal();
}

// Fonction pour diminuer la quantité
function decreaseQuantity(element) {
    const qtyInput = element.parentElement.querySelector('.qty');
    const price = parseFloat(element.parentElement.nextElementSibling.textContent);
    const subtotalElement = element.parentElement.nextElementSibling.nextElementSibling;
    let quantity = parseInt(qtyInput.value);
    if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
        subtotalElement.textContent = price * quantity + ' fr';
        calculateTotal();
    }
}

// Ajouter un gestionnaire d'événements pour le bouton "Ajouter un article"
addButton.addEventListener('click', addProduct);

// Initialiser le total
calculateTotal();
