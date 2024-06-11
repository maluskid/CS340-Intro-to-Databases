-- Data Manipulation Queries

--  Placeholder variables are preceeded with a ':' and followed by 'Input'
--  e.g. ':teamNameInput' is a placeholder variable for the variable 'teamName'


-- Insert Queries-------------------------------------------------------------
-- Add new team
insert into Teams (teamName, coach, wins, losses) 
  values (:teamNameInput, :coachInput, :winsInput, :lossesInput);

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
select * from Teams;

-- Get game Data
select * from Games;

-- Get player data as well as the name of the team they play for
select Players.*, Teams.teamName from Players join Teams on Players.teamID = Teams.teamID;

-- Get Games_Has_Players data
select * from Games_Has_Players;

-- Get user data
select * from Users;

-- Get ratings data
select * from Ratings;

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

-- Update user
update Users set userName = ?, favoritePlayer = ?, favoriteTeam = ? where userID = ?;

-- Edit player in a game (M-to-M relationship update)
update Games_Has_Players set gameID = :gameIDFromDropdownInput and playerID = :playerIDFromDropdownInput;

-- Update a Team
update Teams set teamName = :teamNameInput, coach = :coachInput, wins = :winsInput, losses = :lossesInput where teamID = :teamIDInput;
