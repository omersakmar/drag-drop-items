Made some changes.

- With this version, images you drop to the board are now saved to localStorage.
- Conditional rendering, in case the pictureList array is empty and the Card component does not receive any props
- Now, you can remove an individual item from the board even if there is another item on there that has the same ID. However, this came at the cost of using item index as key
- Removed a typo in the tailwind styling, added some additional conditional rendering
- Now supports Typescript

LIVE DEMO = https://omersakmar-final-push.netlify.app/
