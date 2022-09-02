![Rebus](./public/images/Rebus_logo.png)

:bulb: A simple game project

# Contents

- [How to contribute](#How-to-Contribute)
  - [Fork this repository](#Fork-this-repository)
  - [Clone this repository to Vscode](#Clone-this-repository-to-Vscode)
    - [Import the forked repository to Replit](#Import-forked-repository-on-Replit)
  - [Make changes](#Make-changes)
    - [See your changes](#See-your-changes)
      - [Check changes on Vscode](#Check-on-Vscode)
      - [Check chnages on Replit](#Check-on-Replit)
  - [Commit and Push changes to Github](#Commit-and-Push-changes-to-Github)
    - [Push from VScode](#Push-from-VScode)
    - [Push from Replit](#Push-from-Replit)
  - [Submit your changes for review](#Submit-your-changes-for-review)
- [Upcoming Features](#Upcoming-Features)
- [Notes](#Notes)

# How to Contribute

If you don't have git on your machine, [install it](https://help.github.com/articles/set-up-git/).

## Fork this repository

Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.

## Clone this repository to Vscode

Now clone the forked repository to your machine. Go to your Github account, open the forked repository, click on the button then click the _copy to clipboard_ icon.

Open a terminal in vscode and run the following git commands:

```
git clone "url you just copied"
```

:bulb: where "url you just copied" is the url to this repository (without the quotation marks).

For example:

```
git clone https://github.com/this-is-you/Rebus-Puzzles_webpage.git
```

where `this-is-you` is your Github username.

:bulb: You can also import from Github to Replit.

### Import the forked repository to Replit

## Make changes and commit on VScode

Now click on the src folder and open `Rebuses.jsx` file in a text editor, add your own rebus to it. Don't add it at the beginning or end of the file. Put it anywhere in between. Now, save the file.

```
{
    pattern: ``,
    answer: ``,
    hint: ``,
},
```

:bulb: Your rebus should be in the format above. Note those commas ',' they are very important.

## See your changes

### Check changes on Vscode

Open a terminal, change directory to the cloned repo and run this command:

```
npm run dev
```

then press ```alt + click``` on your keyboard to click on the `http://localhost:.../` 

This will automatically open your browser and render the result on your screen in the browser tab.

### Check changes on Replit



<!-- If you go to the project directory and execute the command `git status`, you'll see there are changes.

Add those changes to the branch you just created using the `git add .` command:

Now commit those changes using the `git commit` command:

```
git commit -m "<your-name> added <number-of-rebus-you-added> rebus(es)"
```

replacing `<your-name>` with your name and `<number-of-rebus-you-added>` with the number of rebus(es) you just added. -->
