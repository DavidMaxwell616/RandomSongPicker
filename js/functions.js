const Fields=[
  'File Name',
  'File Path',
  'File Parent',
  'File Category'
];

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
  console.log(children);
  var table = '<table>\n<tr>\n';
  for(var item=0;item<Fields.length;item++)
  {
    table+='<th>'+ Fields[item]+ '</th>\n';
  }
  table+='</tr>';
  // for(var item=1;item<children.length;item+=2)
  // {
  // var issue_num = parseInt(children[item].getElementsByTagName('issue_num')[0].textContent);
  // if(issue_num===issue){
  //   table += "<tr>\n";
  //   for(var item2=0;item2<Fields.length;item2++)
  // {
  // var cellContents = children[item].getElementsByTagName(Fields[item2].toLowerCase())[0].textContent;
  // table+='<td>'+ cellContents +  '</td>';
  // }
  // table+='</tr>\n';
  // }
  //   }
    table+='</table>';
}

document.getElementById("Table").innerHTML = table;
}
