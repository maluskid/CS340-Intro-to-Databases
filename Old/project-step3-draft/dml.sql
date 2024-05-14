-- Data Manipulation Queries

--  Placeholder variables are preceeded with a ':' and followed by 'Input'
--  e.g. ':teamNameInput' is a placeholder variable for the variable 'teamName'


-- Insert Queries-------------------------------------------------------------
-- Add new team
insert into Teams (teamName, coach, currentRecord) 
  values (:teamNameInput, :coachInput, :currentRecordInput);

-- Add new players
insert into Players (teamID, playerName, jerseyNumber, height, weight)
  values (:teamIDInput, :playerNameInput, :jerseyNumberInput, :heightInput, :weightInput);

-- Add new games
insert into Games (gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore) 
  values (:gameDateInput, :homeTeamInput, :awayTeamInput, :homeTeamScoreInput, :awayTeamScoreInput);

-- Associate a player with a game
insert into Games_Has_Players (gameID, playerID)
  values (:gameIDFromDropdownInput, :playerIDFromDropdownInput);

-- Add new user
insert into Users (userName, favoritePlayer, favoriteTeam)
  values (:userName, :favoritePlayer, :favoriteTeamInput);

-- Post new rating
insert into Ratings (userID, gameID, rating)
  values (:userIDInput, :gameIDFromDropdownInput, :ratingInput);


-- Select Queries--------------------------------------------------------------
-- Get all game data to populate a dropdown for associating a player with a game
select Games.gameID, Games.gameDate, TeamsH.teamName as homeTeamName, TeamsA.teamName as awayTeamName 
from Games
join Teams TeamsH on Games.homeTeam = TeamsH.teamID
join Teams TeamsA on Games.awayTeam = TeamsA.teamID;

-- Get all player data to populate a dropdown for associating a player with a game
select playerID, playerName from Players;

-- Get team data
select teamID, teamName, coach, currentRecord from Teams;

-- Get game Data
select gameID, gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore, overTime, postSeason from Games;

-- Get player data
select playerID, playerName, teamID, jerseyNumber, height, weight from Players;

-- Get Games_Has_Players data
select gameID, playerID from Games_Has_Players;

-- Get user data
select userID, userName, favoritePlayer, favoriteTeam from Users;

-- Get ratings data
select userID, gameID, rating from Ratings;

-- Extra views
-- Get list of players on a team
select Players.playerName, Players.jerseyNumber
from Players
inner join Teams on Players.teamID = Teams.teamID
where Teams.teamName = :teamNameInput;

-- Get players associated with specific game
select Players.playerName
from Players
inner join Games_Has_Players on Players.playerID = Games_Has_Players.playerID
inner join Games on Games_Has_Players.gameID = Games.gameID
where gameID = :gameIDFromDropdownInput;

-- Get all ratings from specific user
select Users.userName, Ratings.rating, Games.gameDate, Games.homeTeam, Games.awayTeam, Games.homeTeamScore, Games.awayTeamScore 
from Users 
inner join Ratings on Users.userID = Ratings.userID
inner join Games on Ratings.gameID = Games.gameID
where Users.userName = :Users.userNameInput;

-- Get all ratings of a specific game
select Users.userName, Ratings.rating, Games.gameDate, Games.homeTeam, Games.awayTeam, Games.homeTeamScore, Games.awayTeamScore 
from Users 
inner join Ratings on Users.userID = Ratings.userID
inner join Games on Ratings.gameID = Games.gameID
where Games.gameID = :Games.gameIDInput;


-- Delete Queries--------------------------------------------------------------
-- Delete a player
delete from Players where playerID = :playerIDInput;

-- Delete a team
delete from Teams where teamID = :teamIDInput;

-- Delete a game
delete from Games where gameID = :gameIDInput;

-- Disasocciate a player from a game (M-to-M relationship deletion)
delete from Games_Has_Players where playerID = :playerIDFromDropdownInput and gameID = :gameIDFromDropdownInput;

-- Delete a user
delete from Users where userID = :userIDInput;

-- Delete a rating
delete from Ratings where userID = :userIDInput and gameID = :gameIDInput;


-- Update Queries--------------------------------------------------------------
-- Update user's favorite player to NULL (set FK value to null)
update Users set favoritePlayer = NULL where userName = :userNameInput;

-- Update user's favorite team to NULL (set FK value to null)
update Users set favoriteTeam = NULL where userName = :userNameInput;

-- Edit player in a game (M-to-M relationship update)
update Games_Has_Players set gameID = :gameIDFromDropdownInput and playerID = :playerIDFromDropdownInput; 