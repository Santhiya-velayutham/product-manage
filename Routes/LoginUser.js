const Router = require("express")


const router = Router()

//admintasks

router.post("/createadmin",require("../Controllers/AuthUser").createadmin);
router.post("/loginadmin",require("../Controllers/AuthUser").loginadmin);


module.exports = router