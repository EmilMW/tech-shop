const { Router } = require("express");
const cartsController = require("../controllers/cartController");
const router = Router();
const { requireAuth } = require("../middleware/auth-middleware");

router.get("/:username", requireAuth, cartsController.getUserCart);
router.get("/:itemId/:quantity", requireAuth, cartsController.addToCart);
router.delete("/:itemId", requireAuth, cartsController.deleteFromCart);
router.put(
  "/:itemId/:quantity",
  requireAuth,
  cartsController.updateItemQuantity
);

module.exports = router;
