const { request } = require('urllib');

async function test(){
  const events = [];
  const apiKey = `${process.env.ATLAS_PUBLIC_KEY}:${process.env.ATLAS_PRIVATE_KEY}`;

  // writes table headers
  table = ".. list-table::\n   :header-rows: 1\n   :widths: 40 35 10\n\n   * - Event Type\n     - Description\n     - Alertable? \n\n"

  // calls public events endpoint for the first time, parses response to json, then adds to the event list
  const request1 = await request('https://cloud.mongodb.com/api/atlas/v2/eventTypes?pretty=true&itemsPerPage=500', {digestAuth: apiKey, headers: {"Accept": "application/vnd.atlas.2023-01-01+json"}});
  const resp1 = JSON.parse(request1.data.toString());

  resp1.results.forEach(atlasEvent => {
      events.push(atlasEvent)
  });

  // calls public endpoint for the second time (limit of 500 responses per call, there are 1000+ now, this gets 501-1000), parses response to json, then adds to the event list
  const request2 = await request('https://cloud.mongodb.com/api/atlas/v2/eventTypes?pretty=true&itemsPerPage=500&pageNum=2', {digestAuth: apiKey, headers: {"Accept": "application/vnd.atlas.2023-01-01+json"}});
  const resp2 = JSON.parse(request2.data.toString());

  resp2.results.forEach(atlasEvent => {
      events.push(atlasEvent)
  });

  // calls public endpoint for the third time (limit of 500 responses per call, there are 1000+ now, this gets 1001-1500), parses response to json, then adds to the event list
  const request3 = await request('https://cloud.mongodb.com/api/atlas/v2/eventTypes?pretty=true&itemsPerPage=500&pageNum=3', {digestAuth: apiKey, headers: {"Accept": "application/vnd.atlas.2023-01-01+json"}});
  const resp3 = JSON.parse(request3.data.toString());

  resp3.results.forEach(atlasEvent => {
      events.push(atlasEvent)
  });

  const responses = resp1.results.concat(resp2.results).concat(resp3.results)

  // alphabetizes events list
  function compare( a, b ) {
      if ( a.eventType < b.eventType ){
        return -1;
      }
      if ( a.eventType > b.eventType ){
        return 1;
      }
      return 0;
    }
    
    responses.sort( compare );

  // iterates through results. replaces true and false with yes and no in the alertable column. adds an anchor to each row. writes a table row for each event. prints table for debugging.
  responses.forEach((item) => {
      var isAlertable = "";
      if (item.alertable == true) {
        isAlertable = "yes";
      } else {
        isAlertable = "no";
      }

      // Replace "Stream Processing Instance" with "Stream Processing Workspace" to match user-facing terminology
      var description = item.description.replace(/Stream Processing Instance/g, "Stream Processing Workspace");

      table += "   * - ``"+item.eventType+ "``\n"+"     - .. _atlas_event_"+item.eventType.toLowerCase()+":\n\n       "+description+"\n     - "+isAlertable+ "\n\n";
  })
  console.log(table)
}

test()