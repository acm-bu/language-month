This is a markdown file for claude code to understand what each of the routes is supposed to contain

We are building an application for students to sign up and 

You should focus only on the frontend, using dummy data. Assume that data will have to be fetched and always default to server components. Whenever you find yourself duplicating code, make a component for it in the `src/components` directory. 

# General Layout
There should be a simple header with links to "Home" and "Current Language" as well as a authentication button on the right that allows the user to either log in or log out.

# Home Page
- Route: `/`

The home page should contain a large hero with the text "ACM Language Month." Below that while still on screen should be either a countdown to the next month, or a button to go to that language. Scrollable off screen should be a list of all previous months.

# Languages Page
- Route: `/languages`

The languages page should show a list of all language months that have been done in the past, as well as a link to try out any of the older ones.

# Language Page
- Route `/languages/[language]`

The specific language page should display a calendar UI with links to the puzzle for each day. Not every day has a puzzle, only four days of each week. Each of these days should link to its respective puzzle link.

# Puzzle Page
- Route `/languages/[language]/[puzzleId]`

The puzzle page is the most complicated and the core of the application. It has two tabs, one on the route `/languages/[language]/[puzzleId]` and one on `/languages/[language]/[puzzleId]/solutions`

The main page should show primarily show a description of the puzzle. This will be loaded from mdx later, but for now just use dummy data. Below that display a forum where users can post and answer questions. Also show a "Submit Solution" button, which opens up a modal with a text editor that the user can use to submit their solution

The solutions page should show a list of all solutions in a forum-like interface with the ability to add comments.

# Login Page
- Route `/auth`

The login page should be toggleable between sign in and sign up and provide a form to log in and sign up. Create reusable components for these elements. There should be an additional query parameter for where the user should be redirected to after the login

# Profile Page
- Route `/profiles/[userId]`

TODO - don't implement yet

