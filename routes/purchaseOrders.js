const purchaseOrderRouter = require('express').Router();

purchaseOrderRouter.get('/getAll', (req, res) => {
  res.send('Hello World!');
});

purchaseOrderRouter.get('/users', (req, res) => {
  // code to retrieve users from database or elsewhere
  res.send(users);
});

purchaseOrderRouter.post('/create', (req, res) => {
    const fs = require("fs");

  const content = "Some content!";

  fs.writeFile(
    "./files/purchase_order/create/purchase_order.txt",
    content,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Running script");
      runScript("./executables/hello.sh");
    }
  );

  return res
    .status(200)
    .json({ success: true, message: "Integration Server Running" });
})



exports = purchaseOrderRouter;