### Grow Therapy Frontend Assessment

A React app bootstrapped with the T3 stack to list the most viewed articles for a specific day.

## Libraries Used

- Next.js
- SCSS
- TypeScript
- SWR (fetching)
- Mantine (UI elements)

## Running the Application

Clone the package and in your terminal, run npm install within the app's folder.

To run the development environment, run npm run dev or check out the [Live Demo 🚀](https://grow-takehome.vercel.app/).

## Takeaways

This was a really fun project to build from scratch (except for using a UI library for the popover and calendar elements). A few areas that I spent some time on were fetching, calendar functionality, and local storage.

### Fetching

I switched from using the standard fetch API to SWR for fetching, and while I do like how much cleaner the code became, there were a couple of challenges, like not triggering a new fetch when the calendar or filter values changed and creating a custom fetch hook with TypeScript.

### Calendar

Finding a simple but elegant calendar UI was tough 🫡

### Local Storage and Pinning

This was definitely the most rewarding part of the functionality, as I had to scrap the concepts I had of how the data works and flows. Creating a custom hook that handled storing the data and formatting the wiki articles was very challenging but helpful in keeping my code concise.
