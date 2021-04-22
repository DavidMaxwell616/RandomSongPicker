const Fields=[
  'File Name',
  'File Path',
  'File Parent',
  'File Category'
];
var files = [];
function loadXMLDoc(file) {
  var xmlhttp = new XMLHttpRequest();
  var doc= this.document;
  xmlhttp.onreadystatechange = function() {
    if (doc.readyState == 'complete' && xmlhttp.status ==200) {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(xmlhttp.responseText, "application/xml");
      LoadData(xmlDoc,"files");
    }
  };
  xmlhttp.open("GET", file, true);
  xmlhttp.send();
}

function LoadData(xml, type) {
var x = xml.getElementsByTagName(type)[0];
if(x!==undefined){
  var children = x.childNodes;
  var table = '<table>\n<tr>\n';
  for(var item=0;item<Fields.length;item++)
  {
    table+='<th>'+ Fields[item]+ '</th>\n';
  }
   children.forEach(child => {
   table+='</tr>\n';
   for(var item2=0;item2<Fields.length;item2++)
    {
      var fieldName = Fields[item2].toLowerCase().replace(/\s/g, '');
     if(child.nodeName==='file'){
      files.push(child);
      var cellContents = child.getElementsByTagName(fieldName)[0].textContent;
   table+='<td>'+ cellContents +  '</td>';
     }
  }
  table+='</tr>\n';
 
  });
    table+='</table>';
}

document.getElementById("Table").innerHTML = table;
}

function GetRandomSong(){   
  var random = Math.floor(Math.random() * files.length);
  var filePath = files[random].getElementsByTagName('filepath')[0].textContent;
  window.open(filePath, "_self");
  }