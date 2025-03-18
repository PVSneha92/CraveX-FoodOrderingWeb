import Cart from "../models/cartModel.js"
import { Restaurant } from "../models/restaurantModel.js";

export async function addToCart(req, res) {
  try {
    const userId = req.customers.id;
    const { Menu_id, Restaurant_id, Quantity } = req.body;
    const restaurant = await Restaurant.findById(Restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const menuItem = restaurant.menu.id(Menu_id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    const itemPrice = menuItem.price * Quantity;
    let cart = await Cart.findOne({ userId, cartStatus: { $ne: "ordered" } });
    if (cart && cart.Restaurant_id.toString() !== Restaurant_id) {
      return res.status(409).json({
        message: "Item from different restaurant is already added to cart",
      });
    }
    if (!cart) {
      cart = new Cart({
        userId,
        Restaurant_id,
        Items: [],
        Cart_total: 0,
        Final_amount: 0,
      });
    }
    const existingItemIndex = cart.Items.findIndex(
      (item) => item.Menu_id.toString() === Menu_id
    );
    if (existingItemIndex > -1) {
      cart.Items[existingItemIndex].Quantity += Quantity;
      cart.Items[existingItemIndex].Total_item += itemPrice;
    } else {
      cart.Items.push({
        Menu_id,
        Quantity,
        Total_item: itemPrice,
      });
    }
    cart.Cart_total = cart.Items.reduce(
      (sum, item) => sum + item.Total_item,
      0
    );
    cart.Final_amount = cart.Cart_total;
    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function addQuantity(req, res) {
  try {
    const userId = req.user.id;
    const { Menu_id, action } = req.body;
    if (!["increment", "decrement"].includes(action)) {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increment' or 'decrement'." });
    }
    const cart = await Cart.findOne({ userId, cartStatus: { $ne: "ordered" } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.Items.findIndex(
      (item) => item.Menu_id.toString() === Menu_id
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    const restaurant = await Restaurant.findById(cart.Restaurant_id);
    const menuItem = restaurant?.menu.id(Menu_id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    const item = cart.Items[itemIndex];
    if (action === "increment") {
      item.Quantity += 1;
      item.Total_item += menuItem.price;
      cart.Cart_total += menuItem.price;
    } else if (action === "decrement") {
      if (item.Quantity > 1) {
        item.Quantity -= 1;
        item.Total_item -= menuItem.price;
        cart.Cart_total -= menuItem.price;
      } else {
        cart.Cart_total -= item.Total_item;
        cart.Items.splice(itemIndex, 1);
      }
    }
    cart.Final_amount = cart.Cart_total;
    await cart.save();
    return res.status(200).json({ message: "Item Quantity updated", cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function viewCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId, cartStatus: { $ne: "ordered" } });
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    const restaurant = await Restaurant.findById(cart.Restaurant_id);
    cart.Items = cart.Items.map((cartItem) => {
      const menuItem = restaurant?.menu.id(cartItem.Menu_id);
      return {
        ...cartItem.toObject(),
        name: menuItem?.name || "Unknown",
        price: menuItem?.price || 0,
      };
    });
    res.status(200).json({ message: "Cart Items fetched", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { Menu_id } = req.params;
    console.log(Menu_id)
    const cart = await Cart.findOne({ userId, cartStatus: { $ne: "ordered" } });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.Items.findIndex(
      (item) => item.Menu_id.toString() === Menu_id
    );
    if (itemIndex > -1) {
      cart.Items.splice(itemIndex, 1);
      cart.Cart_total = cart.Items.reduce(
        (sum, item) => sum + item.Total_item,
        0
      );
      cart.Final_amount = cart.Cart_total;
      if (cart.Items.length === 0) {
        await Cart.findOneAndDelete({ userId, cartStatus: { $ne: "ordered" } });
        return res.status(200).json({ message: "Cart deleted" });
      }
      await cart.save();
      return res.status(200).json({ message: "Item removed from cart", cart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
  