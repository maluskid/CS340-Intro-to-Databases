-- Data Manipulation Queries

--  Placeholder variables are preceeded with a ':' and followed by 'Input'
--  e.g. ':teamNameInput' is a placeholder variable for the variable 'teamName'

-- Insert Queries-------------------------------------------------------------
-- Insert into Teams
insert into Teams (teamName, coach, currentRecord) 
  values (:teamNameInput, :coachInput, :currentRecordInput);

-- Insert into Players
insert into Players (teamID, playerName, jerseyNumber, height, weight)
  values (:teamIDInput, :playerNameInput, :jerseyNumberInput, :heightInput, :weightInput);

-- Insert into Games
insert into Games (gameDate, homeTeam, awayTeam, homeTeamScore, awayTeamScore) 
  values (:gameDateInput, :homeTeamInput, :awayTeamInput, :homeTeamScoreInput, :awayTeamScoreInput);

-- Insert into Games_Has_Players
insert into Games_Has_Players (gameID, playerID)
  values (:gameIDInput, :playerIDInput);

-- Insert into Users
insert into Users (userName, favoritePlayer, favoriteTeam)
  values (:userName, :favoritePlayer, :favoriteTeamInput);

-- Insert into Ratings
insert into Ratings (userID, gameID, rating)
  values (:userIDInput, :gameIDInput, :ratingInput);

-- Select Queries--------------------------------------------------------------
-- Drop-down functionality for Games to be used for creating ratings

-- Get general information about a game (fulfills select M:M)
 

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
-- Delete a rating
-- Delete a player from a game (fulfills delete M:M)


-- Update Queries--------------------------------------------------------------
-- Update user's favorite player (set FK value to null)
-- Update user's favorite team (set FK value to null)
-- Update player's team
-- Edit player in a game (fulfills update M:M)
