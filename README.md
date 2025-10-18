# UUX Angular Dev Repository

## Project Description
This is the angular workspace respository for the **UUX component library** for Angular.
Here you can develop components, execute manual tests on his own playground in demo-app and export them to npm.

## Installation
### 1. Clone the repository:
```bash
git clone https://github.com/universalux/uux-angular.git
```

### 2. Navigate to the project folder:
```bash
cd uux-angular
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Make sure you are on the main branch and your local copy is up to date:
```bash
git checkout main
git pull origin main
```

## Workflow: Creating a New Branch

### 1. Assign yourself to an existing issue you want to work on.
### 2. Always start from the latest main branch:
```bash
git checkout main
git pull origin main
```
### 3. Create a new branch using the issue number and a short description. GitHub allows you to do this directly from the issue page:
- Click “Create branch” on the issue page.
- GitHub will automatically create a branch with the format:
```bash
<issue-number>-<issue-title>
```
- Spaces are replaced by dashes (-), and special characters are sanitized.
Example:
```bash
git checkout -b 12-add-menu-toggler-component
```

### 4. Make your changes, commit following the Husky commit rules, and push the branch when ready for a pull request:
```bash
git add .
git commit -m "feat: add menu toggler component #12"
git push -u origin 12-add-menu-toggler-component
```

## Notes:

* All commits must follow the commit message format enforced by Husky:
```ts
<type>: <issue-description> #<issue-number>
```

| Type     | Type Description                                    |
| -------- | --------------------------------------------------- |
| feat     | A new feature for the project                       |
| fix      | A bug fix                                           |
| docs     | Documentation changes only                          |
| style    | Code style or formatting changes (no logic changes) |
| refactor | Code refactoring without changing functionality     |
| test     | Adding or updating tests                            |
| chore    | Routine tasks and maintenance                       |
| perf     | Performance improvements                            |
| build    | Changes affecting build system or dependencies      |
| ci       | Continuous Integration configuration changes        |
| revert   | Revert previous commits                             |


* Pushes will run automated tests via Husky. Branch deletion skips the tests automatically.

## Util commands:

### 1. Generate a new lib for developing a component:

```bash
ng generate library component-name
```

### 2. Generate a new playground component in demo-app:

```bash
ng generate component playgrounds/pg-component-name --project=demo-app --skip-prefix
```

### 3. Build the component in "watch" mode to work on it
```bash
ng build component-name --watch
```
.
