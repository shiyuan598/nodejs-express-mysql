CREATE TABLE IF NOT EXISTS issue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    version VARCHAR(50),
    title VARCHAR(255),
    content TEXT,
    attachment VARCHAR(255),
    createtime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    state VARCHAR(50),
    `desc` TEXT
);

CREATE TABLE IF NOT EXISTS reply (
    id INT AUTO_INCREMENT PRIMARY KEY,
    issueId INT,
    content TEXT,
    attachment VARCHAR(255),
    `desc` TEXT,
    FOREIGN KEY (issueId) REFERENCES issue(id) ON DELETE CASCADE
);



-- 向 issue 表插入测试数据
INSERT INTO issue (version, title, content, attachment, state, `desc`)
VALUES
    ('1.0', '测试问题1', '这是测试问题1的内容', 'attachment1.jpg', 'open', '这是测试问题1的描述'),
    ('1.0', '测试问题2', '这是测试问题2的内容', 'attachment2.jpg', 'closed', '这是测试问题2的描述'),
    ('1.1', '测试问题3', '这是测试问题3的内容', NULL, 'open', '这是测试问题3的描述');

-- 向 reply 表插入测试数据
INSERT INTO reply (issueId, content, attachment, `desc`)
VALUES
    (1, '这是测试问题1的回复1', NULL, '这是测试问题1的回复1的描述'),
    (1, '这是测试问题1的回复2', NULL, '这是测试问题1的回复2的描述'),
    (2, '这是测试问题2的回复1', NULL, '这是测试问题2的回复1的描述');