import Item from '../models/Item.js'

export const addItem = async (req, res) => {
    try {
        const { itemName, category, quantity, price, supplier } = req.body;

        const item = await Item.create({
            userId: req.user.id,
            itemName,
            category,
            quantity,
            price,
            supplier
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//pagination
export const getItems = async (req, res) => {
    try {

        const { page = 1, limit = 5, search } = req.query;

        const query = { userId: req.user.id };

        if (search) {
            query.itemName = { $regex: search, $options: "i" };
        }

        const items = await Item.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Item.countDocuments(query);

        res.json({
            totalItems: total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            items
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(item);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {

        await Item.findByIdAndDelete(req.params.id);

        res.json({ message: "Item deleted" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLowStockItems = async (req, res) => {
    try {

        const items = await Item.find({
            userId: req.user.id,
            quantity: { $lt: 5 }
        });

        res.json(items);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInventoryStats = async (req, res) => {
    try {

        const items = await Item.find({ userId: req.user.id });

        const totalItems = items.length;

        const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

        const totalValue = items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        res.json({
            totalProducts: totalItems,
            totalStock: totalQuantity,
            inventoryValue: totalValue
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};