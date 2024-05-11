import mysql, { Pool, PoolConnection } from "mysql2/promise";
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from "../config";

const pool: Pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
  });

// 封装执行查询的方法
async function execute(sql: string, params: any[]): Promise<any[]> {
    try {
        // 执行查询操作
        const [result] = await pool.execute(sql, params);
        return result as any[];
    } catch (error) {
        console.error("执行查询时发生错误:", sql, params, error);
        throw error;
    }
}

// 事务执行函数
async function executeTransaction(callback: (connection: PoolConnection) => Promise<void>): Promise<void> {
    let connection: PoolConnection | undefined;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        await callback(connection);

        await connection.commit();
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        throw error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

export default {
    execute, executeTransaction
}