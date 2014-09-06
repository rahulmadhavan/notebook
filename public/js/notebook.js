
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};


function createFolder(){

    var request = $.ajax({
        url: "folder",
        type: "POST",
        data: JSON.stringify({ name : $("#inputName").val(), subject: $("#inputSubject").val() }),
        dataType: "json",
        contentType: "application/json"
    });

    request.done(function( data ){

        fetchContents()

    })


}

function fetchContents(){


    var folder_template = '<tr> \
        <th>{0} </th> \
        <th>{1} </th> \
        <th>{2} </th>\
    </tr>'


    var request = $.ajax({
        url: "folder",
        type: "GET",
        dataType: "json"
    });


    request.done(function( folders ) {

        var folder_html = ''

        alert(folders.length)

        $.each(folders,function(index, element) {
            var folder = folder_template.format(element.id,element.name,element.subject)
            folder_html = folder_html + folder
        })

        $( "#folders" ).html( folder_html );
    });



}