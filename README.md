# BdFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Note: Make sure that you run `npm install --production=false` before.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Further Improvements

1. Improve the reservation form to be wider and more readable.<br>

2. When creating a reservation:<br>
- The user should be able to create/select the Exam (Exam name, points, threshold, time allocated)<br>
- The user should be able to select the Series and the Year and based on that, only the available Groups should be available to be selected<br>
- When selecting the building, only the available ones should show as an option <br>
- When selecting the hour, only the available ones should show as an option <br>

3. Validation on Exam name and required fields error.<br>

4. Login functionality: When logging in as an admin, the edit menu and view menu should be available
and when logging as an user, only the view menu should be available.<br>

5. More UI components: graphs, indicators and so on..