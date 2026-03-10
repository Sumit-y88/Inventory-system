import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    itemName: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    supplier: {
        type: String
    }

},
{ timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;