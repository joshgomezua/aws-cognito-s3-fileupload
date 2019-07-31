var bucketName = 's3-cognito-fileupload-test';
var bucketRegion = 'us-east-1';
var IdentityPoolId = "us-east-1:31da04a1-9cfa-469a-81b2-7e9582712fb1";

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: bucketName}
});


function uploadtoS3(file) {

  var fileName = file.name;
  var destKey = encodeURIComponent(fileName);
  console.log(destKey);

  var params = {
    bucket: bucketName,
    Key: destKey,
    Body: file,
    ACL: 'private'
  };

  s3.upload(params).on('httpUploadProgress', function(evt) {
      var percent = parseInt((evt.loaded * 100) / evt.total);  //This is the result
      console.log("Uploaded :: " + percent +'%');
  }).send(function(err, data) {
      alert("File uploaded successfully.");
  });

}
