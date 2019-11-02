

var spreadUrl = 'https://spreadsheets.google.com/feeds/cells/19VSEIQlQOKzJ-cxsT_oe5_FCBHKH9KPhUHpsGttlyY0/1/public/values?alt=json-in-script&callback=doData';

$.ajax({
    url: spreadUrl,
    jsonp: 'doData',
    dataType: 'jsonp'
});

function AddResponseTable(postname,postcontent,postresponse,posttime,postid) {
    postname = postname.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    postcontent = postcontent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
 var txt1 = '<table frame="box" id="table'+postid+'"  style="width:98%" align="right"> <tr> <td><p>'+posttime+' '+postname+'</p></td> </tr> <tr> <td><p>'+postcontent+'</p></td> </tr> <tr> <td align="right">  </td> </tr> <tr>  </tr><tr><tr><td> <button id="buttonin'+postid+'" onclick="showhide('+postid+')">respond</button></td></tr><tr><td><form style="display: none" onsubmit="this.submit();this.reset();return false;" autocomplete="off" action="https://script.google.com/macros/s/AKfycbwq47GU3D6MHCQW3qHJEjM02PakpoOu7mC-ABXASrTNYK14Su-w/exec" method="get"  id="formin'+postid+'" target="dummyframe" > <input required type="text" value="anonymous" name="name" placeholder="Name"/> <input required type="text" name="Post" placeholder="Post"/> <input required type="hidden" value='+postid+' name="response" /> <button type="submit" id="submit-form">Submit</button> </form></td></tr><td><table style="display: none" style="width:100%"  id="insidetable'+postid+'"> </table></td></tr> </table>';
   
   
   var IdInsideTable = '#'+'insidetable'+postresponse

$(IdInsideTable).prepend(txt1);
}

function AddBodyTable(postname,postcontent,posttime,postid) {
    postname = postname.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    postcontent = postcontent.replace(/</g, "&lt;").replace(/>/g, "&gt;");

 
    
 var txt1 = '<table frame="box" id="table'+postid+'"  style="width:100%" align="right"> <tr> <td><p>'+posttime+' '+postname+'</p></td> </tr> <tr> <td><p>'+postcontent+'</p></td> </tr> <tr> <td align="right">  </td> </tr> <tr>  </tr><tr><tr><td> <button id="buttonin'+postid+'" onclick="showhide('+postid+')">respond</button></td></tr><tr><td><form style="display: none" onsubmit="this.submit();this.reset();return false;" autocomplete="off" action="https://script.google.com/macros/s/AKfycbwq47GU3D6MHCQW3qHJEjM02PakpoOu7mC-ABXASrTNYK14Su-w/exec" method="get"  id="formin'+postid+'" target="dummyframe" > <input required type="text" value="anonymous" name="name" placeholder="Name"/> <input required type="text" name="Post" placeholder="Post"/> <input required type="hidden" value='+postid+' name="response" /> <button type="submit" id="submit-form">Submit</button> </form></td></tr><td><table style="display: none" style="width:100%"  id="insidetable'+postid+'"> </table></td></tr> </table>';
   
  
  
$('#gg').prepend(txt1);
}

function doData(data) {
    datalength = data;
    var results = [];

    var entries = data.feed.entry;

    var previousRow = 0;

    for (var i = 0; i < entries.length; i++) {
        var latestRow = results[results.length - 1];

        var cell = entries[i];

        var text = cell.content.$t;

        var row = cell.gs$cell.row;

        if (row > previousRow) {
            var newRow = [];

            newRow.push(text);

            results.push(newRow);

            previousRow++;
        } else {
            latestRow.push(text);
        }
            

    }
dataarraylenght = results.length;
handleResults(results);
}




function handleResults(spreadsheetArray) {
    var i;
    var responslist = [];

for (i = 1; i < spreadsheetArray.length; i++) {

if (spreadsheetArray[i][2] == 0){
AddBodyTable(spreadsheetArray[i][0],spreadsheetArray[i][1],spreadsheetArray[i][3],spreadsheetArray[i][4]); 
  }
  else{
   responslist.push(spreadsheetArray[i]);
    }

 }
var i;
for (i = 0; i < responslist.length; ) {

for (i = 0; i < responslist.length; i++) {
var ing = "#"+"insidetable"+responslist[i][2];
    if( $(ing).length ){
  AddResponseTable(responslist[i][0],responslist[i][1],responslist[i][2],responslist[i][3],responslist[i][4]);
}
    
    
}
}
responsebutton(responslist);
}

 
function showhide(IdInsideTable){
    var e = document.getElementById("insidetable"+IdInsideTable);
    var f =  document.getElementById("formin"+IdInsideTable);
     if (e.style.display == "none"){
        e.style.display = "block";
        f.style.display = "block";
     }else{
     e.style.display = "none";
     f.style.display = "none";
     }

     }
     
  
function responsebutton(responslist){
var a = return2(responslist);
var s = unique(a);
var responsebutton=[];
for (var t = 0; t < s.length; t++) {
    
    var count = 0;
for(var i = 0; i < a.length; ++i){
    if(a[i] == s[t])
        count++;
}
responsebutton.push([s[t],count]);
}
changebuttonresponse (responsebutton);
}

function unique(arr) {
    var a = [];
    for(var i=0; i<arr.length; i++) {
        for(var j=i+1; j<arr.length; j++) {
            if (arr[i] === arr[j])
              j = ++i;
        }
        a.push(arr[i]);
    }
    return a;
}

function return2(arr) {
    var a = [];
    for(var i=0; i<arr.length; i++) {
          a.push(arr[i][2]);
    }
    return a;
}

function changebuttonresponse (responsebutton){
for(var i = 0; i < responsebutton.length; ++i){

    $("#buttonin"+responsebutton[i][0]).html("responses:"+responsebutton[i][1]);

}
}


