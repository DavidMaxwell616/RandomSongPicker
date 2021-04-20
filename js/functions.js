var filePaths = [];

function loadData() {
    $.ajax({
        url: "../files",
        success: function(data){
            var myTable = '<table>\n';
            myTable += '<tr><th>FILE NAME</th><th>FILE PATH</th></tr>\n';
            $(data).find('a:contains(.txt)').each(function(){
            var filePath = $(this).attr("href");
            var fileName = filePath.replace('/files/', '').replace('.txt', '').replace(/%20/g, " ");
            myTable += '<tr>\n';
            myTable += '<td>' + fileName + '</td>\n';
            myTable += '<td>' + filePath + '</td>\n';
            filePaths.push(filePath);
            myTable += '</tr>\n';
        });
           myTable += '</table>';
          document.getElementById("Table").innerHTML = myTable;
        }
      });
  }
  
function GetRandomSong(){   
var random = filePaths[Math.floor(Math.random() * filePaths.length)];
window.open(random, "_self");
}