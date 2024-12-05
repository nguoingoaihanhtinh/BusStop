drop database Busstop
create database BusStop;
use  BusStop;
CREATE TABLE Users (
    UserId INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    Avatar VARCHAR(255)
);
CREATE TABLE Bus (
    BusId INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    busType VARCHAR(255),
    busModel VARCHAR(255) NOT NULL,
    seatType VARCHAR(255),
    seatCapacity INT NOT NULL,
    Rating DECIMAL(3, 2) DEFAULT 0.0,
    NumberRating DECIMAL(10, 2) DEFAULT 0
);
CREATE TABLE Ticket (
    TicketId INT AUTO_INCREMENT PRIMARY KEY,
    BusId INT NOT NULL,
    departure VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    startTime DATETIME NOT NULL,
    arrivalTime DATETIME NOT NULL,
    seatleft INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (BusId) REFERENCES Bus(BusId)
);


CREATE TABLE TicketOrder (
    OrderId INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    TicketId INT NOT NULL,
    CreatedAt datetime,
    Address VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (TicketId) REFERENCES Ticket(TicketId)
);
CREATE TABLE Seat (
    SeatId INT AUTO_INCREMENT PRIMARY KEY,
    OrderId INT NOT NULL,
    SeatNumber VARCHAR(10) NOT NULL,
    Status ENUM('available', 'booked') DEFAULT 'available',
    FOREIGN KEY (OrderId) REFERENCES TicketOrder(OrderId) ON DELETE CASCADE
);
-- INSERT INTO Users (Username, Password, Email, Address, Avatar) VALUES
-- ('nguyenanh', 'password123', 'nguyen.anh@example.com', 'Hanoi', 'avatar1.jpg'),
-- ('tranthuy', 'securepass456', 'tran.thuy@example.com', 'Ho Chi Minh City', 'avatar2.jpg'),
-- ('phamminh', 'pass789', 'pham.minh@example.com', 'Da Nang', 'avatar3.jpg'),
-- ('ngothuy', 'mypassword', 'ngo.thuy@example.com', 'Can Tho', 'avatar4.jpg');
INSERT INTO Bus (Name, busType, busModel, seatType, seatCapacity, Rating, NumberRating) VALUES
('Mai Linh Express', 'Luxury', 'Hyundai Universe', 'Soft Seat', 40, 4.5, 120),
('Phuong Trang', 'Economy', 'Toyota Coaster', 'Hard Seat', 45, 4.2, 200),
('Hoang Long', 'VIP', 'Mercedes Benz', 'Sofa', 30, 4.8, 150),
('Thaco Express', 'Standard', 'Thaco TB85', 'Soft Seat', 50, 4.3, 180);
INSERT INTO Ticket (BusId, departure, destination, startTime, arrivalTime, seatleft, price) VALUES
(1, 'Hanoi', 'Ho Chi Minh City', '2024-12-04 06:30:00', '2024-12-04 20:30:00', 10, 1000000.00),
(2, 'Da Nang', 'Nha Trang', '2024-12-04 07:00:00', '2024-12-04 13:30:00', 15, 500000.00),
(3, 'Hanoi', 'Hai Phong', '2024-12-04 08:00:00', '2024-12-04 11:00:00', 5, 300000.00),
(4, 'Can Tho', 'Vung Tau', '2024-12-04 09:30:00', '2024-12-04 17:30:00', 8, 800000.00);
INSERT INTO TicketOrder (UserId, TicketId,CreatedAt,Address) VALUES
(1, 1, '2004-02-02','Ha Noi'),
(2, 2,'2004-02-02', 'Ho Chi Minh City'),
(9, 3,'2004-02-02','Da Nang'),
(9, 4,'2004-02-02','Hai Phong');
select * from users;
INSERT INTO Seat (OrderId, SeatNumber, Status) VALUES
(4, 'A9', 'available'),
(1, 'A2', 'available'),
(1, 'A3', 'available'),
(2, 'B1', 'booked'),
(2, 'B2', 'booked'),
(2, 'B3', 'booked');
select * from users;
drop table seat;
drop table TicketOrder;
SELECT * FROM ticketorder ;
