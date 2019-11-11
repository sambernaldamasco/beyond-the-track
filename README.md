# Beyond the Track
### Full-stack application for Roller Derby teams to manage tryouts assessments
Live site:
#### http://beyond-the-track.herokuapp.com

---

## Built with:
* JavaScript
* Node.js
* HTML
* CSS(Bulma CSS framework)
* MongoDB
* Express
* EJS

---

## App functions:
* Able to sign up for team tryouts without a need for an account
* Guest user can search for the status of their admission
* Simulates an invite-only sign up for admin users
* Admin users can edit stats from each skater signed up for tryouts
* Admin user can also add new skaters
* Admin user can accept or decline skater to enter the team

---

## Approach taken
All skaters saved into a database, skills are breakdown by categories and subcategories on an object list. Most of the pages are route protected and checks if an admin user is logged in.

---

## Unsolved problems
* Being able to add multiple leagues and associate skaters only with the leagues they're part of
* Tooltip for each skill on the assessments page
