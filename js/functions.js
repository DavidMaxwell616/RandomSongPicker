const Fields=[
  'File Name',
  'File Path',
  'File Parent',
  'File Category',
  'File Select'
];
var files = [];
var filteredFiles = [];
var filteredIds = [];
var bandList=[];
var genreList=[];
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
var bands = document.getElementById("bands");
var genres = document.getElementById("genres");
if(x!==undefined){
  var children = x.childNodes;
  var table = '<table>\n<tr>\n';
  for(var item=0;item<Fields.length;item++)
  {
    table+='<th>'+ Fields[item]+ '</th>\n';
  }
  table+='</tr>\n';
   children.forEach(child => {
    var path;
    if(child.nodeName==='file'){
      files.push(child);
      table+='<tr>\n';
      for(var item2=0;item2<Fields.length;item2++)
    {
      var cellContents = '';
     var fieldName = Fields[item2].toLowerCase().replace(/\s/g, '');
      if(child.getElementsByTagName(fieldName)[0]!=undefined)
     {
      cellContents = child.getElementsByTagName(fieldName)[0].textContent;
      if(fieldName=='fileparent')
     {
        var opt = cellContents.trim();
    if(opt.length>0 && !bandList.includes(opt))
        {
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          bands.appendChild(el);
          bandList.push(opt);
        }
      }
    if(fieldName=='filecategory')
     {
        var opt = cellContents.trim();
        if(opt.length>0 && !genreList.includes(opt))
        {
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          genres.appendChild(el);
          genreList.push(opt);
        }
      }
      if(fieldName=='filepath') path = cellContents;
     }
      if(fieldName=='fileselect')
      cellContents= "<button id='btnSelect' onclick='GetSong(`"+ path +"`)' >Select</button>";
      table+='<td>'+ cellContents +  '</td>\n';
     }
    }
    table+='</tr>\n';
  
   });
    table+='</table>';
}
filteredFiles = files;
document.getElementById("Table").innerHTML = table;
}

function PopulateBands(){
  var select = document.getElementById("bands");
  for(var i = 0; i < files.length; i++) {
    var opt = files[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
}

function GetRandomSong(){   
  var random = Math.floor(Math.random() * filteredFiles.length);
  var href = location.href.replace('/index.html','');
  var filePath = href+filteredFiles[random].getElementsByTagName('filepath')[0].textContent;
  window.open(filePath, "_self");
  }

  function GetSong(path){
    var href = location.href.replace('/index.html','');
    var filePath = href+path;
    window.open(filePath, "_self");
    }

function ResetTable(){
  var bands = document.getElementById("bands").value;
  var genres = document.getElementById("genres").value;
  var table = '<table>\n<tr>\n';
  for(var item=0;item<Fields.length;item++)
  {
    table+='<th>'+ Fields[item]+ '</th>\n';
  }
  table+='</tr>\n';
  filteredFiles = [];
  filteredIds = [];
  
  files.forEach(file => {
    if(file!=undefined){
      var band = file.getElementsByTagName('fileparent')[0]?.textContent.trim();
      var genre = file.getElementsByTagName('filecategory')[0]?.textContent.trim();
      var index = file.children[0]?.textContent.trim();
      if((bands=='all' || bands == band) && (genres=='all' || genres==genre) && !filteredIds.includes(index))
      {
          var row = '<tr>\n';
          for(var item2=0;item2<Fields.length;item2++)
          {
          var fieldName = Fields[item2].toLowerCase().replace(/\s/g, '');
          var cellContents = '';
          cellContents = file.getElementsByTagName(fieldName)[0].textContent;
          if(fieldName=='filepath') path = cellContents;
          if(fieldName=='fileselect')
            cellContents= "<button id='btnSelect' onclick='GetSong(`"+ path +"`)' >Select</button>";
          row+='<td>'+ cellContents +  '</td>';
          }
          row+='</tr>\n';
          table+=row;
          filteredFiles.push(file);
          filteredIds.push(index);
        }
    }
  });
      table+='</table>';
      document.getElementById("Table").innerHTML = table;
  }