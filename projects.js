function createProject(apiToken, projectName, description, address, opt_profileId) {
  var url = "https://www.helioscope.com/api/projects/";
  
  // use default profile if if none specified
  if (opt_profileId == null) {
    opt_profileId = 6162;
  }
  
  // get lat and lng from address
  var latLon = getLatLon(address);
  latitude = latLon.lat;
  longitude = latLon.lng;
  
  // fill in form data based on info
  var formData = {
    "profile_id" : opt_profileId,
    "name" : projectName,
    "address" : address,
    "description" : description,
    "geometry" : {},
    "location" : {
      "latitude": latitude,
      "longitude": longitude
    }
  };
  
  var options = {
    'method' : 'post',
    'headers': {
      "access_token": apiToken
    },
    'contentType': 'application/json',
    'payload' : JSON.stringify(formData)
  };
  var projectId = JSON.parse(UrlFetchApp.fetch(url, options).getContentText())["project_id"].toString();
  return projectId;
}

function readProject(apiToken, projectId) {
  url = "https://www.helioscope.com/api/projects/" + projectId;
  var options = {
    'method' : 'get',
    'headers': {
      "access_token": apiToken
    },
    'contentType': 'application/json'
  };
  var projectObject = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
  return projectObject;
}

function updateProject(apiToken, projectId, updateParams) {
  url = "https://www.helioscope.com/api/projects/" + projectId;
  var options = {
    'method' : 'put',
    'headers': {
      "access_token": apiToken
    },
    'contentType': 'application/json',
    'payload' : JSON.stringify(updateParams)
  };
  var projectObject = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
  return projectObject;
}

function deleteProject(apiToken, projectId) {
  url = "https://www.helioscope.com/api/projects/" + projectId;
  var options = {
    'method' : 'delete',
    'headers': {
      "access_token": apiToken
    },
    'contentType': 'application/json'
  };
  var response = UrlFetchApp.fetch(url, options);
  return response;
}


function newHelioscopeDesign(projectId) {
//  var projectId = 1041591;
  try {
    var url = "https://www.helioscope.com/api/designs/";
    
    var formData = {
      "description": "A1-Draft",
      "project_id": projectId,
    };
    
    var options = {
      'method' : 'post',
      'headers': {
        "access_token": apiToken
      },
      'contentType': 'application/json',
      'payload' : JSON.stringify(formData)
    };
    
    var designId = JSON.parse(UrlFetchApp.fetch(url, options).getContentText())["design_id"];
    return designId;
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
}


function getNumMAVs(desiredPower, modulePower, numBeams, numPortrait) {
  try {
    var numMAvs = Math.floor(1000 * desiredPower / (modulePower * 2 * numPortrait * (numBeams - 1))) + 1;
    return numMAvs;
  } catch(f) {
    Logger.log(f.toString());
    var numMAvs = 1;
    return numMAvs;
  }
}