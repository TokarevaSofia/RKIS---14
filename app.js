const express = require('express');
const app = express();
const PORT = 3000;

// ===== НАСТРОЙКИ =====
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
    if (!req.query.category) {
        return res.status(400).json({
            error: 'Необходимо указать категорию'
        });
    }

    res.json({
        message: 'Список сладостей',
        category: req.query.category,
        product: req.query.product,
        price: req.query.price
    });
});

app.post('/order', (req, res) => {
    const { name, product, quantity } = req.body;

    if (!name || !product || !quantity) {
        return res.status(400).json({
            error: 'Необходимо заполнить все поля'
        });
    }

    if (Number(quantity) < 1) {
        return res.status(400).json({
            error: 'Количество должно быть не меньше 1'
        });
    }

    res.json({
        message: 'Заказ успешно оформлен',
        order: {
            name,
            product,
            quantity: Number(quantity)
        }
    });
});   

app.use(function (req, res) {
    res.status(404).send('404: Страница не найдена');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});