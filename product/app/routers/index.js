const {
  GetProductsHandler,
  GetSingleProductHandler,
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
} = require("../controllers");

const router = require("express").Router();

router.get("/", GetProductsHandler);
router.get("/:id", GetSingleProductHandler);
router.post("/", CreateProductHandler);
router.patch("/:id", UpdateProductHandler);
router.delete("/:id", DeleteProductHandler);

module.exports = router;
