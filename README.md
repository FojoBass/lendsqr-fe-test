OVERVIEW:
This project is for the frontend developer test at Lendsqr, that contains 4 pages; Login, Users (part of dashboard), User detail (part of dashboard) and Error page

TECHNOLOGIES:
Stack used for this project: React with Typescript, SCSS.
Additional installed dependencies: react-icons and react-router-dom
Mock API: Apidog (https://mock.apidog.com/m1/521444-481610-default/lendersqr/users?apidogToken=5eTTdqdRdA2zCVyizjDNc)
Localstorage: For storing the fetched user informations

ABOUT
The project was developed based off the provided Figma file, with some little adjustments made.

Login Page:
Validation was added to make the UX more realistic, and error messages added below each input element.

Also, a spinner was added to the login button to mock request loading.

Dashboard | Users Page:
Skeleton loading was implemented when request for user information is yet to be complete. The purpose is to give the user a visual cue of the content to be loaded, and to also maintain of sense of continuity in the UI.

Grid and flex box was used to ensure responsiveness. For the table, horizontal scroll was employed when necessary, to preserve the UI of the table, while still providing the needed information to the user in the clearest form

This page also has pagination, so as not to display all the info at once, and also, the user is allowed to choose how much info is to be displayed per page.

Dashboard | User Detail Page:
By using the id from the url params, the user info is gotten from the general users information stored in the Localstroage. This information is displayed on the page.

Like the Users page, grid and flex box was also employed here to ensure seamless responsiveness.

Error Page:
Should in case a user enters a wrong route, this page is displayed, asking the user to redirect back to the last visited page.
