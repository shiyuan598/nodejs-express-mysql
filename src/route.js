const express = require("express");
const router = express.Router();

// 响应处理
const fullFilled = (response, data, pagination) => {
    response.json({
        code: 0,
        data,
        pagination,
        msg: "成功"
    });
};

// route异常处理
const errorHandler = (response, err) => {
    response &&
        response.status(500).json({
            code: 1,
            msg: err.toString()
        });
};

// 处理特定路径的路由
router.get("/", (req, res) => {
    res.send("测试 " + Date.now());
});


router.get("/list", async (request, response) => {
    try {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Date.now())
            }, 3000);
        }).then(
            (value) => fullFilled(response, value),
            (error) => errorHandler(response, error)
        );        
    } catch (error) {
        errorHandler(response, error);
    }
});

module.exports = router;
