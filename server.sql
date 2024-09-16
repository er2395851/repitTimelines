
CREATE TABLE useraccount (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from useraccount;

CREATE TABLE event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_detail varchar(255),
    FOREIGN KEY (user_id) REFERENCES useraccount(id)
);

select * from event;

INSERT INTO useraccount (username, password, email) VALUES 
('user1', 'password1', 'user1@example.com'),
('user2', 'password2', 'user2@example.com'),
('user3', 'password3', 'user3@example.com');

INSERT INTO event (user_id, event_date, event_detail) VALUES
(1, '2024-01-01 10:00:00', 'Event One Detail'),
(2, '2024-01-01 10:00:00', 'Event Two Detail'),
(3, '2024-01-01 10:00:00', 'Event three Detail');

SELECT * FROM useraccount
INNER JOIN event ON useraccount.id = event.event_id;

SELECT *
FROM useraccount
INNER JOIN event
ON useraccount.id = event.event_id;