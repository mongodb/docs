// This script runs within the context of actions/github-script.
module.exports = ({ context, core }) => {
  console.log('Building dynamic matrix with external JavaScript...');

  // Add more specs here, following the same structure:
  // {
  //   "filter_name": The filter name used by dorny/paths-filter.
  //   "name": Arbitrary name of the OpenAPI spec.
  //   "file": Source path of the OpenAPI spec file.
  //   "doc_id_var": Bump doc ID var name. Should correspond to a var name set in the repo settings.
  // },
  const allSpecsDefinitions = [
    {
      filter_name: 'rm_api',
      name: 'Relational Migrator API', 
      file: 'content/relational-migrator/source/rm-openapi-latest.json', 
      doc_id_var: 'RM_DOC_ID', 
    },
  ];

  let matrixArray = [];
  const eventName = context.eventName;

  if (eventName === 'workflow_dispatch') {
    console.log('Workflow dispatched manually. Running for all known specs.');
    matrixArray = allSpecsDefinitions;
  } else {
    // Access outputs from the "filter" step.
    // These were passed as environment variables (or inputs) to this github-script step.
    const filterOutputsVal = process.env.FILTER_OUTPUTS;

    if (!filterOutputsVal) {
      console.log('No FILTER_OUTPUTS found.')
      return;
    }

    // Filter specs based on which files changed
    const filterOutputs = JSON.parse(filterOutputsVal);

    // Handle null case
    if (!filterOutputs) {
      console.log('No JSON object found');
      return;
    }

    matrixArray = allSpecsDefinitions.filter(({ filter_name }) => {
      const filterOutput = filterOutputs[filter_name];
      // dorny/paths-filter returns filter outputs as strings
      if (typeof(filterOutput) === 'string') {
        return filterOutput === 'true';
      }
      return filterOutputs[filter_name];
    });
  }

  // Ensure the matrix output is always a valid JSON array, even if empty
  if (matrixArray.length === 0) {
    console.log('No specs changed or selected. Outputting empty matrix.');
  } else {
    const output = JSON.stringify(matrixArray);
    // Set the "matrix" output for subsequent jobs
    core.setOutput('matrix', output);
    console.log(output);
  }
};
