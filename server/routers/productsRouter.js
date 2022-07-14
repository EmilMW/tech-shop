const { Router } = require("express");
const productsController = require("../controllers/productsController");
const router = Router();
const { requireAuth } = require("../middleware/auth-middleware");

router.get("/", productsController.getAllProducts);
router.post("/", requireAuth, productsController.createProduct);
router.put("/", requireAuth, productsController.editProduct);
router.delete("/:id", requireAuth, productsController.deleteProduct);

module.exports = router;
