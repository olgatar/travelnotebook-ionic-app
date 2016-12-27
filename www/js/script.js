// Function to get new entry image blob url used for image preview
function getEntryImageURL(event){
  var entryImagePath = URL.createObjectURL(event.target.files[0]);
  // publish image in html preview div
  $('#entry-image-div').css('background-image', 'url(' + entryImagePath + ')');
}


// Function to auto expand textarea
// I do not own this sollution, is borrowed from http://codepen.io/vsync/pen/frudD
$(document)
    .one('focus.textarea', '.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.textarea', '.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0,
            rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
        this.rows = minRows + rows;
    });
