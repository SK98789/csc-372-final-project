#Setup
Simply follow the link below and create a new account with a google account, or log in if you are a returning visitor.

#App URL
https://csc-372-final-project.onrender.com/

#Reflection Writeup
##Design Choices
I chose React for the frontend and Node/Express for the backend as I felt more comfortable with Client Side Rendering and the concept of React Components felt cleaner to me.

As for the database, I went with Neon using Postgres because it makes it very easy to make queries, and serverless postgres is simpler to handle for a short project.

##Challenges
One decent technical hurdle I had was actually deploying the project using Render. I solved it via trial and error. The main reason it was a hurdle was it took a bit of time due to the fact that I would redeploy it after making a change. There are also many different pieces of information to change when switching from local hosting to actual deployment, like environment variables, authentication urls, and adding scripts to the package file.

Another issue I had was figuring out how to add a popup modal for a form. Although I looked into making something myself, I insted opted to use the react-modal package, as it saved a lot of time and it also handles accessibility considerations as well.

##Learning Outcomes
I have learned that full-stack development is very complex. For example, getting a user's classes stored in the database has to follow the path component -> service -> route -> controller -> model and back again. 

I have learned that there are many rules to front end development. I was unaware of many of the details of CSS and layout designs. I also have learned that I am not good at styling pages.

Related to being bad at styling pages, I also learned that sometimes its important to use available packages rather than try to make certain things myself. This can save time, and many packages have also already considered things like accessibility, which is important to include.

##Future Work
I would add more features like sub-features to allow the user to create sub-tasks within their tasks. I also would add more profile information for the user. Additionally, I would add a calendar to display the user's tasks more cleanly, and I would like to filter their tasks by date as well.