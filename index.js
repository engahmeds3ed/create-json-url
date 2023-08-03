const core = require('@actions/core');
const fs   = require('fs');
const path = require("path");

const fileName = core.getInput('name');
const jsonUrl = core.getInput('url');
const dir = core.getInput('dir');
const fullPath = path.join(process.env.GITHUB_WORKSPACE, dir || "", fileName);

try {
	core.info(`Downloading json contents from url: ${jsonUrl}...`);

	fetch(jsonUrl)
		.then((response) => {})
		.then(jsonString => {

			core.info(`Url content is downloaded.`);

			let fileContent = JSON.stringify(jsonString);
			fileContent = JSON.parse(fileContent)

			core.info(`Creating json file ${fullPath}...`);

			fs.writeFile(fullPath, fileContent, function (error) {

				if (error) {
					core.setFailed(error.message);
					throw error
				}

				core.info('JSON file created.')

				fs.readFile(fullPath, null, (err) => {
					if (err) {
						core.setFailed(error.message)
						throw err
					}

					core.info('JSON checked.')
					core.setOutput("successfully", `Successfully created json on ${fullPath} directory with content from ${jsonUrl}`);
				});
			});

		})
		.catch(function (err) {
			core.setFailed("Unable to fetch url with the error: " + err);
		});

} catch (err) {
	core.setFailed(err.message);
}
