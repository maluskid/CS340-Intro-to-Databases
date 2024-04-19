# CS340 Shared Repository
### Group 53: Dominic and Denyse 'Film Fiends'

The command `git clone https://github.com/maluskid/CS340-Intro-to-Databases.git`
will initialize a git repository in your PWD that mirrors this one. I have yet
to manage a repository with more maintainers than just myself, so that will be an
interesting hurdle to cross. I'll look into setting permissions so you don't need
to make merge requests to merge your code into the repository. It's possible you
could simply make a fork of this repository to have your own working one and I could
do the same, and we can merge when we need to into the group repository.

I'm going to be working from the branch `dominic`. I like to keep a lot of my school files
in a Github Repository because I often work from both my desktop and laptop and that allows
me to bounce around quickly and easily. You can make your own branch with `git branch <branch_name>`
and then swap over to it from the `main` branch with `git checkout <branch_name>`. I'll link the
[Git documentation](https://git-scm.com/docs) too. The command `git log` can be helpful for viewing
the current status of different branches and commit history etc.

Docker setup of mariadb was done with command `docker run --detach --name mydb --env MARIADB_USER=maluski --env 
MARIADB_PASSWORD=9069 --env MARIADB_DATABASE=cs340_maluskid --env MARIADB_ROOT_PASSWORD=password  mariadb:latest`
Note username was typod as 'maluski' instead of 'maluskid'. Run `docker exec -it mydb bash` and then connect
to mariadb to use database.
