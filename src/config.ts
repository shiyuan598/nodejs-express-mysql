let config = {
    PORT: 9040,
    RELEASE_FILE_PATH: "/home/wangshiyuan/code/testData",
    DB_HOST: "localhost",
    DB_PORT: 3307,
    DB_USER: "zhito",
    DB_PASSWORD: "zhito26@#",
    DB_DATABASE: "xwayos"
};

if (process.env.NODE_ENV === "production") {
    config = {
        PORT: 9040,
        RELEASE_FILE_PATH: "/home/version-files",
        DB_HOST: "172.16.12.50",
        DB_PORT: 3307,
        DB_USER: "zhito",
        DB_PASSWORD: "zhito26@#",
        DB_DATABASE: "xwayos"
    };
}

console.info(config);

export const { PORT, RELEASE_FILE_PATH, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = config;
