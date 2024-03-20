# Group-Random-Picker

# Instructions: -----------------------------------------------------------

# RANDOM PICKER

- in this group exercise, you'll be building an app from scratch that lets you provide some items and pick one randomly

## What we practice

- react hooks we know (useState, useEffect, useContext, useReducer)
- timer functions (setTimeout, setInterval)
- react library for modal(popup window)
- media queries
- localStorage
- github workflow & more ...

## Before we start...

- make sure you understand the app as a whole
- then think about the steps you need

- while working on Step 1 & 2:
  - one lead person creates a starter repo and the rest clone the repo
  - share the screen and get the code done by actively discussing together

### [Step 1] Form - Add and Remove an Item, Render Items Accordingly

![step1](./step1.png)

- create a component `RandomPicker` and work on it

- create `h2` saying "add items and pick one"

- create a form

- with useState, get an item from the user input

- do following with useReducer:

  1. `initial state` will be an object with one property to begin with: `{items: an array}`

  2. write a `reducer` function to handle action types below:

  - `ADD` add an item into an items array
  - `DELETE` delete an item from an items array

  3. add event handlers for the actions above and handle some errors on submitting the form:

  - if no input is provided, alert the user "no input"
  - if the input already exists, alert the user "item already exists"

once the items are rendered(after adding/deleting) properly, let's move onto the next

### [Step 2] Play & Reset - Pick one Item randomly after Displaying each Item at certain intervals, Reset the state

- add a boolean property `isPlaying` into `initialState`. default value is set to `false`

- add two more actions in `reducer` function:

  - `PLAY` - toggles the boolean value of `isPlaying`

  - `PICK` - get one item randomly from the `items` array
    (hint) write a function that accepts an array as argument and get a random element out of it
    - call the function in the place of `PICK` value

- On clicking `play` button, call a function `handlePlay` in which...

  - action type `PLAY` is triggered.
  - `isPlaying` value is toggled.
  - note: if there's only one item in an items array, alert the user "minimum 2 items required to play".

- while `isPlaying` is true (toggled by clicking the play button)

  - we will listen to this state update and trigger the action type `PICK`. in order to achieve this, **useEffect** will come very handy

  - when action type `PICK` is triggered:

    - all the items in an `items` array will be displayed one after another **at certain intervals** for 2 seconds. use timer function `setTimeout` &`setInterval`

    [MDN for setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

    - the value of `h2` is changed to the random outputs from the action type `PICK`.

    - deactivate the play button while it's playing

## Main logic is done. Now you may split the tasks with the team members and finish your project

### [Step 3] Improve, Brush up, Style

1. use `localStorage` and save the items array

(hint: useEffect)

- whenever the `items` array updates, localStorage array will be updated as well
- on page reload, the saved items must appear (modify `initialState`)

2. add `reset` button

- add an action type `RESET` in `reducer` function
- onClick, the state gets reset
- localStorage becomes an empty array

3. use gif images for a funny effect

- save some links from [giphy](https://giphy.com/) in an array
- add a new action type `PICK_GIF`, apply the same logic as the action type `PICK`
- render the random gif images at certain intervals for 2 seconds while `isPlaying` is true

4. replace all the alerts with modal

- research & use a react library: [one example](https://www.npmjs.com/package/reactjs-popup)
- read the documentation closely and apply modal

5. move the reducer to a context

- split the component and move some part of `jsx` to small sub-components(`Form`, `Items`, `Modal`)
- make sure the components subscribe to the reducerContext & directly access the data if necessary

6. style your app

- visual aspect is important, do your best
- with some animation effects (e.g. blinking effect at the end)
- by using media queries, create a breakpoint for mobile device

[bonus challenge] when `playing`, slow down the interval speed at the end! (promise & async might do the job)

### [Final Step] Get Ready for Deploy

- once the team app is done, now it's time to have one in your own github account

- make sure to copy the team repo in a different location in your machine.

- change the name of copied repo, not to be confused with the team repo

- from your github account, create a new remote repo and link the copied repo to it

- we will deploy our app together in the main room

[reference app](https://random-picker-y7ay.onrender.com)
