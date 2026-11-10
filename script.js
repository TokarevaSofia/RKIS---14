const form = document.getElementById('order-form');

const result = document.getElementById('result');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const name = document.getElementById('name').value;

    const product = document.getElementById('product').value;

    const quantity = document.getElementById('quantity').value;

    const response = await fetch('/order', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: name,
            product: product,
            quantity: quantity
        })
    });

    const data = await response.json();

    result.textContent = JSON.stringify(data, null, 2);

});