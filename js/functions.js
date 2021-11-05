const Fields=[
  'File Name',
  'File Path',
  'File Parent',
  'File Category',
  'File Select'
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
      return xmlDoc;
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
   var path;
   var parent;
   for(var item2=0;item2<Fields.length;item2++)
    {
      var fieldName = Fields[item2].toLowerCase().replace(/\s/g, '');
      if(child.nodeName==='file'){
      files.push(child);
     var cellContents = '';
      if(child.getElementsByTagName(fieldName)[0]!=undefined)
     {
      cellContents = child.getElementsByTagName(fieldName)[0].textContent;
      if(fieldName=='filepath') path = cellContents;
     // if(fieldName=='fileparent') parent = cellContents.replace("%20", " ");
     }
      if(fieldName=='fileselect')
      cellContents= "<button id='btnSelect' onclick='GetSong(`"+ path +"`)' >Select</button>";
      
    //console.log(cellContents);  
    
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
  var href = location.href.replace('/index.html','');
  var filePath = href+files[random].getElementsByTagName('filepath')[0].textContent;
  window.open(filePath, "_self");
  }

  function GetSong(path){
    console.log(path);
    var href = location.href.replace('/index.html','');
    var filePath = href+path;
    window.open(filePath, "_self");
    }

