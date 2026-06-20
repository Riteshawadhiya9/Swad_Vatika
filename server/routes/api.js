import express from 'express';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// ==========================================
// MENU ROUTES
// ==========================================

// GET /api/menu - Fetch all menu items
router.get('/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
});

// POST /api/menu - Add a new menu item
router.post('/menu', async (req, res) => {
  try {
    const newItem = new MenuItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error adding menu item', error: error.message });
  }
});

// DELETE /api/menu/:id - Remove a menu item
router.delete('/menu/:id', async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json({ message: 'Menu item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
});

// ==========================================
// ORDER ROUTES
// ==========================================

// POST /api/orders - Create a new order
router.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order', error: error.message });
  }
});

// GET /api/orders - Fetch all orders (newest first)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// PATCH /api/orders/:id - Update order status
router.patch('/orders/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error updating order status', error: error.message });
  }
});

// ==========================================
// RESERVATION ROUTES
// ==========================================

// POST /api/reservations - Create a new reservation
router.post('/reservations', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creating reservation', error: error.message });
  }
});

// GET /api/reservations - Fetch all reservations (newest first)
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
});

// PATCH /api/reservations/:id - Update reservation status
router.patch('/reservations/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: 'Error updating reservation status', error: error.message });
  }
});

// ==========================================
// ANALYTICS ROUTE
// ==========================================

// GET /api/analytics - Get summary metrics
router.get('/analytics', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalMenuItems = await MenuItem.countDocuments();

    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['Confirmed', 'Delivered'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.status(200).json({
      totalOrders,
      totalRevenue,
      totalReservations,
      totalMenuItems
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating analytics', error: error.message });
  }
});

export default router;
