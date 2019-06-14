function newFieldSegment(designId, numMavs, mavLength, mavWidth) {
//  var designId = 1873398;
//  var numMavs = 6;
//  var mavLength = 34.28;
//  var mavWidth = 6;
  
  var totalLength = mavLength;
  var totalWidth = mavWidth * numMavs;
  
  try {
    var url = "https://www.helioscope.com/api/designs/" + designId;
    
    var options = {
      'method' : 'get',
      'headers': {
        "access_token": apiToken
      },
      'contentType': 'application/json'
    };
    
    var wiringZoneId = JSON.parse(UrlFetchApp.fetch(url, options).getContentText())["wiring_zones"][0]["wiring_zone_id"];
    Logger.log("wiring zone id is: " + wiringZoneId);
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
  try {
    var url = "https://www.helioscope.com/api/field_segments/";
    
    var formData = {
      "bank_depth":6,
      "bank_width":5,
      "dome_spacing":0,
      "frame_spacing":0.915,
      "gcr":0.6,
      "inner_setback":0,
      "max_size":0,
      "module_id":41249,
      "module_spacing": 0.02,
      "orientation":"vertical",
      "rack_type":"dual",
      "reference_height":0,
      "row_spacing":0.125,
      "row_spacing_strategy":"fixed",
      "tilt":10,
      "tilt_strategy":"fixed",
      "geometry":{
     "path":[
       {
         "x":0,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":totalWidth,
         "z":0
       },
       {
         "x":0,
         "y":totalWidth,
         "z":0
       }
     ],
     
     "path_3d":[
       {
         "x":0,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":totalWidth,
         "z":0
       },
       {
         "x":0,
         "y":totalWidth,
         "z":0
       }
     ],
     "base_3d":[
       {
         "x":0,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":0,
         "z":0
       },
       {
         "x":totalLength,
         "y":totalWidth,
         "z":0
       },
       {
         "x":0,
         "y":totalWidth,
         "z":0
       }
     ]
   },
      "design_id":designId,
      "description":"9B5PMAV",
      "wiring_zone_id":wiringZoneId,
      "basePlane":{
        "normal":{
          "x":0,"y":0,"z":1
        },
        "constant":-0.000001,
        "projectionMatrixCache":{}
      }
    }
    
    var options = {
      'method' : 'post',
      'headers': {
        "access_token": apiToken
      },
      'contentType': 'application/json',
      'payload' : JSON.stringify(formData)
    };
    
    var response = JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
    Logger.log(response);
    return response;
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
}