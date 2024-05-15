CREATE TABLE IF NOT EXISTS issue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    attachment MEDIUMBLOB,
    filename VARCHAR(255),
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    state INT DEFAULT 0 CHECK (state IN (0, 1, 2)) COMMENT '0: 正常, 1: 隐藏, 2: 删除'
);

CREATE TABLE IF NOT EXISTS reply (
    id INT AUTO_INCREMENT PRIMARY KEY,
    issue_id INT UNIQUE,
    content TEXT,
    attachment MEDIUMBLOB,
    filename VARCHAR(255),
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (issue_id) REFERENCES issue(id) ON DELETE CASCADE
);