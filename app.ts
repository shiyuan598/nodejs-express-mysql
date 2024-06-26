import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import releaseRoutes from "./src/routes/release";
import feedbackRoutes from "./src/routes/feedback";
import authRoutes from "./src/routes/auth";
import {PORT} from "./src/config"

const app = express();

// 设置基本配置和中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// 注册模块路由
app.use("/api/feature", releaseRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/auth", authRoutes);

// 处理根路径的HTTP请求
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

// 创建HTTP服务器
app.listen(PORT, () => {
    console.log(`HTTP server is running on port ${PORT}`);
});
