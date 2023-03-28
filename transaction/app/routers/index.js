const {
  CreateNewTransactionHandler,
  UpdateTransactionHandler,
  DeleteTransactionHandler,
  GetTransactionByIdHandler,
  GetTransactionsHandler,
} = require("../controllers");

const router = require("express").Router();

router.post("/", CreateNewTransactionHandler);
router.patch("/:id", UpdateTransactionHandler);
router.delete("/:id", DeleteTransactionHandler);
router.get("/:id", GetTransactionByIdHandler);
router.get("/", GetTransactionsHandler);

module.exports = router;
