-- Disable foreign key checks temporarily
SET
    foreign_key_checks = 0;

-- Create Tables --------------------------------------------------------
-- Teams Table
create or replace table Teams (
  teamID tinyint(2) auto_increment unique primary key not null,
  teamName varchar(100) not null,
  coach varchar(100),
  currentRecord varchar(5)
);

-- Games Table
create or replace table Games (
  gameID int(12) auto_increment unique primary key not null,
  gameDate date not null,
  homeTeam tinyint(2) not null,
  awayTeam tinyint(2) not null,
  homeTeamScore int(3) not null,
  awayTeamScore int(3) not null,
  overTime tinyint(1),
  postseason boolean,
  foreign key (homeTeam) references Teams (teamID) ON DELETE CASCADE,
  foreign key (awayTeam) references Teams (teamID) ON DELETE CASCADE,
  -- homeTeam must be different from awayTeam
  constraint different_teams CHECK (homeTeam != awayTeam)
);

-- Players Table
create or replace table Players (
  playerID int(12) auto_increment unique primary key not null,
  playerName varchar(100) not null,
  teamID tinyint(2) not null,
  jerseyNumber tinyint(2),
  height varchar(5),
  weight smallint(3),
  foreign key (teamID) references Teams (teamID) ON DELETE CASCADE
);

-- Games_Has_Players Table (intersection table)
create or replace table Games_Has_Players (
  gameID int(12),
  playerID int(12),
  primary key (gameID, playerID),
  foreign key (gameID) references Games(gameID) ON DELETE CASCADE,
  foreign key (playerID) references Players(playerID) ON DELETE CASCADE
);

-- Users Table
create or replace table Users (
  userID int(12) auto_increment unique primary key not null,
  userName varchar(20) unique not null,
  favoritePlayer int(12),
  favoriteTeam tinyint(2),
  foreign key (favoritePlayer) references Players (playerID) ON DELETE SET NULL,
  foreign key (favoriteTeam) references Teams (teamID) ON DELETE SET NULL
);

-- Ratings Table
create or replace table Ratings (
  userID int(12) not null,
  gameID int(12) not null,
  primary key (userID, gameID),
  rating tinyint(1) not null,
  foreign key (userID) references Users (userID) ON DELETE CASCADE,
  foreign key (gameID) references Games (gameID) ON DELETE CASCADE
);

-- Insert Data ----------------------------------------------------------

-- Teams Data
insert into Teams ( 
  teamName, 
  coach, 
  currentRecord
)
values 
(
  "Washington Wizards",
  "Brian Keefe",
  "15-67"
),
(
  "San Antonio Spurs",
  "Gregg Popovich",
  "22-60"
),
(
  "Charlotte Hornets",
  "Steve Clifford",
  "21-61"
);

insert into Players (
  teamID, 
  playerName,
  jerseyNumber, 
  height, 
  weight
)
values
(
  (select teamID from Teams where teamName = "Charlotte Hornets"),
  "LaMelo Ball",
  1,
  "6'7",
  180
),
(
  (select teamID from Teams where teamName = "Charlotte Hornets"),
  "Grant Williams",
  2,
  "6'6",
  236
),
(
  (select teamID from Teams where teamName = "Washington Wizards"),
  "Jordan Poole",
  13,
  "6'4",
  194
),
(
  (select teamID from Teams where teamName = "Washington Wizards"),
  "Kyle Kuzma",
  33,
  "6'9",
  221
),
(
  (select teamID from Teams where teamName = "San Antonio Spurs"),
  "Victor Wembanyama",
  1,
  "7'4",
  210
),
(
  (select teamID from Teams where teamName = "San Antonio Spurs"),
  "Jeremy Sochan",
  10,
  "6'8",
  230
);

-- -- Testing CHECK constraint in Games Table
-- insert into Games (
--   gameDate,
--   homeTeam, 
--   awayTeam, 
--   homeTeamScore,
--   awayTeamScore
-- ) 
-- values
-- ( "2024-01-20",
--   (select teamID from Teams where teamName = "San Antonio Spurs"),
--   (select teamID from Teams where teamName = "San Antonio Spurs"),
--   127,
--   131
-- );

-- Games Data
insert into Games (
  gameDate,
  homeTeam, 
  awayTeam, 
  homeTeamScore,
  awayTeamScore
) 
values
( "2024-01-20",
  (select teamID from Teams where teamName = "Washington Wizards"),
  (select teamID from Teams where teamName = "San Antonio Spurs"),
  127,
  131
),
( "2024-01-29",
  (select teamID from Teams where teamName = "San Antonio Spurs"),
  (select teamID from Teams where teamName = "Washington Wizards"),
  118,
  113
),
( "2024-01-19",
  (select teamID from Teams where teamName = "Charlotte Hornets"),
  (select teamID from Teams where teamName = "San Antonio Spurs"),
  124,
  120
);

insert into Games_Has_Players (
  gameID,
  playerID
)
values
(
  (select gameID from Games where gameDate = "2024-01-20" and awayTeam = (select teamID from Teams where teamName = "San Antonio Spurs")),
  (select playerID from Players where playerName = "Victor Wembanyama")
),
(
  (select gameID from Games where gameDate = "2024-01-20" and homeTeam = (select teamID from Teams where teamName = "Washington Wizards")),
  (select playerID from Players where playerName = "Jordan Poole")
),
(
  (select gameID from Games where gameDate = "2024-01-19" and homeTeam = (select teamID from Teams where teamName = "Charlotte Hornets")),
  (select playerID from Players where playerName = "LaMelo Ball")
);

-- Users Data
-- User with favorite player and team
insert into Users (
  userName,
  favoritePlayer,
  favoriteTeam
)
values 
(
  "SlenderMan",
  (select playerID from Players where playerName = "Victor Wembanyama"),
  (select teamID from Teams where teamName = "San Antonio Spurs")
);
-- Users without favorite players or teams
insert into Users (userName) values ("RedVelvet"), ("goat");

-- Ratings Data
insert into Ratings (
  userID,
  gameID,
  rating
)
values
(
  (select userID from Users where userName = "RedVelvet"),
  (select gameID from Games where gameDate = "2024-01-20" and awayTeam = (select teamID from Teams where teamName = "San Antonio Spurs")),
  6
),
(
  (select userID from Users where userName = "SlenderMan"),
  (select gameID from Games where gameDate = "2024-01-29" and homeTeam = (select teamID from Teams where teamName = "San Antonio Spurs")),
  10
),
(
  (select userID from Users where userName = "goat"),
  (select gameID from Games where gameDate = "2024-01-19" and homeTeam = (select teamID from Teams where teamName = "Charlotte Hornets")),
  2
);

-- Re-enable foreign key checks
SET
    foreign_key_checks = 1;