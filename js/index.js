var storageRef = firebase.storage().ref();
var database = firebase.database();

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

var testID = makeid(6);
document.getElementById("test-id").innerHTML = 'TEST ID: '+testID;

var upload = document.getElementById('inputGroupFileAddon04');
upload.addEventListener('click', function(e) {
  var fileList = document.getElementById('inputGroupFile04').files[0];

  var selectdOpt = document.querySelector('input[name="flexRadioDefault"]:checked').value;

  var questionId = makeid(10);
  console.log(selectdOpt);
  var fileName = fileList.name;
  storageRef.child(testID+'/'+fileName)
    .put(fileList).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then((url) => {
        console.log('File available at', url);
        firebase.database().ref('questions/'+testID+'/'+questionId ).set({
          questionId: questionId,
          correctOption: selectdOpt,
          questionURL : url
        });

        firebase.database().ref('oldQP/'+testID+'/'+questionId ).set({
          questionId: questionId,
          questionURL : url,
          correctOption: selectdOpt,
          selectedOpt : 'notVisted',
          points : 0 
        });
        
        firebase.database().ref('results/'+testID ).set({
          testID: testID,
          status : "NOT STARTED",
          marks: 0,
          startedTime : 0,
        });


      });
  });

});
