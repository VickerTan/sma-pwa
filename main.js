const db = new Dexie('ShoppingApp');
db.version(1).stores({ items: '++id,name,quantity,isPurchased' });

const itemForm = document.querySelector('#form-item');
const itemList = document.querySelector('#item-list');
const totalPriceDiv = document.querySelector('#total-price');

const createItems = async () => {
    const allItems = await db.items.reverse().toArray();

    itemList.innerHTML = allItems.map(item => `
        <div class="item ${item.isPurchased && 'purchased'}">
            <label>
                <input
                    type="checkbox"
                    class="checkbox"
                    onchange="toggleItemStatus(event, ${item.id})"
                    ${item.isPurchased && 'checked'}
                    />
            </label>

            <div class="item-info">
                <p>${item.name}</p>
                <p>$${item.price} x ${item.quantity}</p>
            </div>

            <button class="delete" onclick="removeItem(${item.id})">
                X
            </button>
        </div>
    `).join('');

    const arrOfPrices = allItems.map(item => item.price * item.quantity);
    const totalPrice = arrOfPrices.reduce((a, b) => a + b, 0);

    totalPriceDiv.innerText = 'Total price: $' + totalPrice;
}

window.onload = createItems();

itemForm.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-input').value;
    const quantity = document.querySelector('#quantity-input').value;
    const price = document.querySelector('#price-input').value;

    await db.items.add({ name, quantity, price });
    await createItems();
    
    itemForm.reset();
}

const toggleItemStatus = async (event, id) => {
    await db.items.update(id, { isPurchased: !!event.target.checked });
    await createItems();
}

const removeItem = async (id) => {
    await db.items.delete(id);
    await createItems();
}

