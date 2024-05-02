create or replace table Games (
  gameID int(12) auto_increment unique primary key not null,
  homeTeam tinyint(2) not null,
  awayTeam tinyint(2) not null,
  finalScore varchar(7) not null,
  overTime tinyint(1),
  postSeason boolean,
  foreign key (homeTeam) references Teams (teamID),
  foreign key (awayTeam) references Teams (teamID),
  constraint different_teams CHECK (homeTeam != awayTeam)
);

create or replace table Users (
  userID int(12) auto_increment unique primary key not null,
  userName varchar(20) unique not null,
  favoritePlayer int(12),
  favoriteTeam tinyint(2),
  foreign key (favoritePlayer) references Players (playerID),
  foreign key (favoriteTeam) references Teams (teamID)
);

create or replace table Players (
  playerID int(12) auto_increment unique primary key not null,
  teamID tinyint(2) not null,
  jerseyNumber tinyint(2),
  height varchar(5),
  weight tinyint(3),
  foreign key (teamID) references Teams (teamID)
);

create or replace table Games_Has_Players (
  gameID int(12),
  playerID int(12),
  primary key (gameID, playerID),
  foreign key (gameID) references Games(gameID),
  foreign key (playerID) references Players(playerID),
);

create or replace table Ratings (
  userID int(12) not null,
  gameID int(12) not null,
  primary key (userID, gameID),
  rating tinyint(1) not null,
  foreign key (userID) references Users (userID),
  foreign key (gameID) references Games (gameID),
);