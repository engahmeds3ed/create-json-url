# Create local JSON file from url
This GitHub Action allows you to create a local JSON file from an external URL. It can be used as a step in your GitHub workflow to fetch JSON data and save it to a file.

## Usage
To use this action, add the following step to your workflow file:
```
- name: Get and Save JSON details
  id: saveJSONDetails
  uses: engahmeds3ed/create-json-url@v0.0.1
  with:
    name: "lists.json"
    url: "https://example.org/list"
    dir: '/'
```
This step will fetch the JSON data from the specified URL and save it as "lists.json" in the root directory of your repository.

## Inputs
- **name** (required): The name of the output JSON file.
- **url** (required): The URL of the JSON data.
- **dir** (optional): The directory path where the JSON file should be saved. Default is the root directory ("/").

## Output
- **file_path**: The relative file path of the saved JSON file.

## Full Example
Here's an example workflow that uses this action:

```
name: Fetch JSON Data

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Get and Save JSON details
        id: saveJSONDetails
        uses: engahmeds3ed/create-json-url@v0.0.1
        with:
          name: "lists.json"
          url: "https://example.org/list"
          dir: '/'

      - name: Display file path
        run: echo "Saved JSON file path: ${{ steps.saveJSONDetails.outputs.file_path }}"
```
In this example, the action is triggered on a push event to the main branch. It fetches the JSON data from the specified URL and saves it as "lists.json" in the root directory of the repository. The file path is then displayed in the console.

## License
MIT License
