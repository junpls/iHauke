-- Up
CREATE TABLE `User` (
	`name`	TEXT NOT NULL,
	`board`	INTEGER NOT NULL,
	`num`	INTEGER NOT NULL,
	PRIMARY KEY(name,board),
	FOREIGN KEY(`board`) REFERENCES Board(id)
);
CREATE TABLE `Debt` (
	`board`	INTEGER NOT NULL,
	`user`	INTEGER NOT NULL,
	`time`	INTEGER NOT NULL,
	`gets`	INTEGER NOT NULL,
	`reason`	TEXT,
	PRIMARY KEY(board,user,time),
	FOREIGN KEY(`board`) REFERENCES Board(id)
);
CREATE TABLE "Board" (
	`id`	INTEGER UNIQUE,
	`password`	TEXT,
	`creation`	INTEGER NOT NULL,
	PRIMARY KEY(id)
);

-- Down
DROP TABLE `User`;
DROP TABLE `Debt`;
DROP TABLE "Board";

