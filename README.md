![Rebus](./public/images/Rebus_logo.png)

:bulb: A simple game project

# Contents

- [How to contribute](#How-to-Contribute)
  - [Fork this repository](#Fork-this-repository)
  - [Clone this repository to Vscode](#Clone-this-repository-to-Vscode)
    - [Import from Github to Replit](#Import-from-Github-to-Replit)
  - [Make changes](#Make-changes)
    - [See your changes](#See-your-changes)
      - [Check changes on Vscode](#Check-changes-on-Vscode)
      - [Check changes on Replit](#Check-changes-on-Replit)
  - [Commit and Push changes to Github](#Commit-and-Push-changes-to-Github)
    - [Commit and Push from VScode](#Commit-and-Push-from-VScode)
    - [Commit and Push from Replit](#Commit-and-Push-from-Replit)
  - [Submit your changes for review](#Submit-your-changes-for-review)
- [Upcoming Features](#Upcoming-Features)

# How to Contribute

If you don't have git on your machine, [install it](https://help.github.com/articles/set-up-git/).

## Fork this repository

Fork this repository by clicking on the fork button on the top of this page. This will create a copy of this repository in your account.

![For this repo](./public/images/1.png)

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

### Import from Github to Replit

## Make changes

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

If you got this warning `vite is not recognized as an internal or external command`, run this command with internet connection to install vite:

 ```
 npm i vite
 ```

After the installation is successful, run this command again:

```
npm run dev
```

then press ```alt + click``` on your keyboard to click on the `http://localhost:.../`

This will automatically open your browser and render the result on your screen in the browser tab.

### Check changes on Replit

You can check the changes you've made by simplying clicking on the run button.

## Commit and Push changes to Github

### Commit and Push from VScode

Open a terminal, change directory to the project directory and execute the command `git status`, you'll see the changes and what file you made the changes.

Add those changes to the branch you just created using the `git add .` command:

Now commit those changes using the `git commit` command:

```
git commit -m "<your-name> added <number-of-rebus-you-added> rebus(es)"
```

replacing `<your-name>` with your name and `<number-of-rebus-you-added>` with the number of rebus(es) you just added.

Push your changes using the command `git push`:

```
git push origin <branch-name>
```

replace `<branch-name>` with `main`,`master` or your current branch name.

:bulb: use `git branch` to check the branch you are working on.

<details>
<summary> <strong>If you get any errors while pushing, click here:</strong> </summary>

- ### Authentication Error

     <pre>remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
  remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information.
  fatal: Authentication failed for 'https://github.com/<your-username>/Rebus-Puzzles_webpage.git/'</pre>  
   Go to [GitHub's tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) on generating and configuring an SSH key to your account.

</details>

### Commit and Push from Replit

To commit and push from Replit, follow the images below:

## Submit your changes for review

If you go to your repository on Github, you'll see a `Contribute` and `Sync fork` buttons as shown below:

Now sumbit the pull request.

Soon I'll be merging all your changes into the main branch of this project. You will get a notification email once the changes have been merged.

Thank you for your contribution Champ :Love:

# Upcoming Features for Rebus
- New UI for desktop view
- Input your name before starting the game

:bulb: You can send in the feature(s) you think I should add by emailing youngtechie0@gmail.com. Thank you :kissing_heart: