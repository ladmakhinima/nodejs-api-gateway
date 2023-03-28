const {
  CreateOrderHandler,
  DeleteOrderHandler,
  GetOrdersByIdHandler,
  GetOrdersHandler,
  UpdateOrderHandler,
} = require("../controllers");

const router = require("express").Router();

router.post("/", CreateOrderHandler);
router.patch("/:id", UpdateOrderHandler);
router.delete("/:id", DeleteOrderHandler);
router.get("/:id", GetOrdersByIdHandler);
router.get("/", GetOrdersHandler);

module.exports = router;
