# Updating the npm packages

The dependencies can be brought up to date by updating the file package.json. The best way to do that is by using a tool called npm-check-updates. It can be installed globally by running the command:

    npm install -g npm-check-updates

Using this tool, the up-to-dateness of dependencies is checked in the following way:

    $ npm-check-updates
    Checking ...\ultimate-hooks\package.json
    [====================] 9/9 100%

    @testing-library/react ^13.0.0 → ^13.1.1
    @testing-library/user-event ^14.0.4 → ^14.1.1
    react-scripts 5.0.0 → 5.0.1

    Run ncu -u to upgrade package.json

The file package.json is brought up to date by running the command ncu -u.

# Checking for security problems

With npm audit

# Some recommended packages:

Lot of data: lodash
functional programming: ramda
forms: react hook form
Charts: recharts and highcharts
immutable data: immer

React best practices: reactpatterns.com
