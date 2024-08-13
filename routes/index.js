const express=require("express");
const indexRouter=express.Router();



const customerRouter=require("./customers");
const contractsRouter=require("./contracts");
const paymentsRouter=require("./payments");
const productsRouter=require("./products");
const markasRouter=require("./markas");
const modelsRouter=require("./models");
const statusRouter=require("./status");
const creditTermsRouter=require("./creditTerms");



indexRouter.use("/customers",customerRouter);
indexRouter.use("/contracts",contractsRouter);
indexRouter.use("/payments",paymentsRouter);
indexRouter.use("/products",productsRouter);
indexRouter.use("/markas",markasRouter);
indexRouter.use("/models",modelsRouter);
indexRouter.use("/status",statusRouter);
indexRouter.use("/creditterms",creditTermsRouter);


module.exports=indexRouter;