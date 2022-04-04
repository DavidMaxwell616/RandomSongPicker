$('#table').bootstrapTable({
url: '../data/files.json',
pagination: true,
search: true,
columns: [{
 field: 'id',
 title: 'id'
}, {
   field: 'filename',
   title: 'File Name'
}, {
   field: 'filepath',
   title: 'File Path'
}, {
   field: 'fileparent',
   title: 'Artist'
}, {
   field: 'filecategory',
   title: 'Genre'
}]
})

function GetRandomSong(){
var visibleRows = $('#table').bootstrapTable('getData');
var random = Math.floor(Math.random() * visibleRows.length);
var href = location.href.replace('/index.html','');
var filePath = href+visibleRows[random].filepath;
window.open(filePath, "_self");
}
