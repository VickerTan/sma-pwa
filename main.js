const db = new Dexie('ShoppingApp');
db.version(1).stores({ items: '++id,name,quantity,isPurchased' });

const itemForm = document.querySelector('#form-item');
const itemList = document.querySelector('#item-list');
const totalPrice = document.querySelector('#total-price');

const createItems = async () => {
    const allItems = await db.items.reverse().toArray();

    itemList.innerHTML = allItems.map(item => `
        <div class="item ${item.isPurchased && 'purchased'}">
            <label>
                <input type="checkbox" class="checkbox" checked />
            </label>

            <div class="item-info">
                <p>Toothbrush</p>
                <p>$6 x 3</p>
            </div>

            <button class="delete">X</button>
        </div>
    `);
}

itemForm.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-input').value;
    const quantity = document.querySelector('#quantity-input').value;
    const price = document.querySelector('#price-input').value;

    await db.items.add({ name, quantity, price });
    
    itemForm.reset();
}