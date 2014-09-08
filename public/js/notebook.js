
String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};


(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);



/////////////////////////////FOLDER FUNCTIONS START


function createFolder(){

    var request = $.ajax({
        url: "folder",
        type: "POST",
        data: JSON.stringify({ name : $("#inputName").val(), subject: $("#inputSubject").val() }),
        dataType: "json",
        contentType: "application/json"
    });

    request.done(function( data ){

        fetchFolders()

    })


}


function deleteFolder(id){

    var folder_id = $.QueryString["folder"]

    var r = confirm("Are you sure you want to delete Folder "+id);

    if (r == true){

        var request = $.ajax({
            url: "folder/"+id,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json"
        });

        request.done(function(folders) {
            fetchFolders()
        });

    }else{

    }

}


function fetchFolders(){

    var folder_template = '<tr> \
        <th onclick="loadAssignments({4})">{0} </th> \
        <th>{1} </th> \
        <th>{2} </th>\
        <th><button type="button" class="btn btn-danger" onclick="deleteFolder({3})">Delete</button> </th> \
    </tr>'


    var request = $.ajax({
        url: "folder",
        type: "GET",
        dataType: "json"
    });


    request.done(function( folders ) {
        var folder_html = ''
        $.each(folders,function(index, element) {
            var folder = folder_template.format(element.id,element.name,element.subject,element.id,element.id)
            folder_html = folder_html + folder
        })

        $( "#folders" ).html( folder_html );
    });

}



/////////////////////////////FOLDER FUNCTIONS END

/////////////////////////////ASSIGNMENT FUNCTIONS START





function loadAssignments(folder_id){

    window.location= "http://localhost:3000/assignments?folder_id="+folder_id

}

function createAssignment(){

    var folder_id = parseInt($.QueryString["folder_id"])

    var request = $.ajax({
        url: "assignment",
        type: "POST",
        data: JSON.stringify({ folder_id : folder_id, name: $("#inputName").val() }),
        dataType: "json",
        contentType: "application/json"
    });

    request.done(function( data ){

        fetchAssignments(folder_id)

    })


}


function deleteAssignment(id){

    var folder_id = $.QueryString["folder_id"]

    var r = confirm("Are you sure you want to delete Assignment "+id);

    if (r == true){

        var request = $.ajax({
            url: "assignment/"+id,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json"
        });

        request.done(function(folders) {
            fetchAssignments(folder_id)
        });

    }else{

    }

}



function fetchAssignmentsOnLoad(){

    var folder_id = parseInt($.QueryString["folder_id"])

    fetchAssignments(folder_id)

}


function fetchAssignments(folder_id){

    var assignment_template = '<tr> \
        <th onclick="loadRecords({3})" >{0} </th> \
        <th>{1} </th> \
        <th><a href="#" class="btn btn-success" onclick="downloadReport({2})" ><i class="icon-white icon-arrow-down"></i> Report </a> </th> \
        <th><button type="button" class="btn btn-danger" onclick="deleteAssignment({3})">Delete</button> </th> \
    </tr>'


    var request = $.ajax({
        url: "folder/"+ folder_id +"/assignments",
        type: "GET",
        dataType: "json"
    });


    request.done(function( assignments ) {
        var assignment_html = ''
        $.each(assignments,function(index, element) {
            var assignment = assignment_template.format(element.id,element.name,element.id,element.id,element.id)
            assignment_html = assignment_html + assignment
        })

        $( "#assignments" ).html( assignment_html );
    });

}


function downloadReport(assignment_id){

    window.location = "assignment/"+ assignment_id +"/report";

}

/////////////////////////////ASSIGNMENT FUNCTIONS END


/////////////////////////////RECORD FUNCTIONS START



function loadRecords(assignment_id){

    window.location= "http://localhost:3000/records?assignment_id="+assignment_id

}

$(function() {
    $('#inputDate').datepicker();
    $('#inputStart').timepicker({
        showNowButton: true,
        showDeselectButton: true,
        defaultTime: '',  // removes the highlighted time for when the input is empty.
        showCloseButton: true
    });
    $('#inputStop').timepicker({
        showNowButton: true,
        showDeselectButton: true,
        defaultTime: '',  // removes the highlighted time for when the input is empty.
        showCloseButton: true
    });
});


function createRecord(){

    var assignment_id = $.QueryString["assignment_id"];

    var date = $('#inputDate').val()
    var who = $('#inputWho').val()
    var start = $('#inputStart').val()
    var stop = $('#inputStop').val()
    var interrupts = $('#inputInterruptions').val()
    var question = $('#inputQuestion').val()
    var comments = $('#inputComments').val()
    var commit = $('#inputCommit').is(':checked')


    var request = $.ajax({
        url: "record",
        type: "POST",
        data: JSON.stringify({ date : date,
            who: who,
            start: start,
            stop: stop,
            interruptions: interrupts,
            question: question,
            comments: comments,
            commit: commit,
            assignment_id: assignment_id
        }),
        dataType: "json",
        contentType: "application/json"
    });

    request.done(function( data ){

        fetchRecords(assignment_id)

    })

}


function deleteRecords(id){

    var assignment_id = $.QueryString["assignment_id"]

    var r = confirm("Are you sure you want to delete Record "+id);

    if (r == true){

        var request = $.ajax({
            url: "record/"+id,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json"
        });

        request.done(function(folders) {
            fetchRecords(assignment_id)
        });

    }else{

    }

}

function saveRecord(record_id){

    var assignment_id = $.QueryString["assignment_id"];

    var date = $('#editDate').val()
    var who = $('#editWho').val()
    var start = $('#editStart').val()
    var stop = $('#editStop').val()
    var interrupts = $('#editInterruptions').val()
    var question = $('#editQuestion').val()
    var comments = $('#editComments').val()
    var commit = $('#editCommit').is(':checked')

    var request = $.ajax({
        url: "record/"+record_id,
        type: "POST",
        data: JSON.stringify({ date : date,
            who: who,
            interruptions: interrupts,
            question: question,
            comments: comments,
            commit: commit,
            start: start,
            stop: stop
        }),
        dataType: "json",
        contentType: "application/json"
    });

    request.done(function( data ){

        fetchRecords(assignment_id)

    })

}


function startRecord(record_id){
    var request = $.ajax({
        url: "record/"+record_id+"/start",
        type: "POST",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json"
    });
}

function stopRecord(record_id){
    var request = $.ajax({
        url: "record/"+record_id+"/stop",
        type: "POST",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json"
    });
}

function editRecords(record_id){


    var record_template = '<th>{0} </th> \
        <th><input id="editDate" type="text" class="input-small" placeholder="Date" value="{1}"></th> \
        <th><input id="editWho" type="text" class="input-small" placeholder="Who" value="{2}"></th> \
        <th><input id="editStart" type="text" class="input-small" placeholder="Start Time" value="{3}"></th> \
        <th><input id="editStop" type="text" class="input-small" placeholder="Stop Time" value="{4}"></th> \
        <th><input id="editInterruptions" type="text" class="input-small" placeholder="Interruptions" value="{5}"> </th> \
        <th><input id="editQuestion" type="text" class="input-small" placeholder="Question" value="6"> </th> \
        <th><textarea id="editComments" rows="3" class="input-small" placeholder="Comments">{7}</textarea></th> \
        <th>{8} </th> \
        <th><button type="button" class="btn btn-warning" onclick="saveRecord({9})">Save</button> </th>\
        <th></th>>';




    var assignment_id = $.QueryString["assignment_id"];

    var request = $.ajax({
        url: "record/"+record_id,
        type: "GET",
        dataType: "json"
    });

    request.done(function( element ) {

        var id = option(element.id);
        var date = ''
        if(element.date != null){
            var date_array = element.date.split('-')
            date = date_array[1]+'/'+date_array[2]+'/'+date_array[0]
        }
        var who = option(element.who)
        var start = option(element.start)
        var stop = option(element.stop)
        var interruptions = option(element.interruptions)
        var question = option(element.question)
        var comments = option(element.comments)
        var commit = ''
        if(element.commit == true){
            commit = '<input id="editCommit" type="checkbox" class="input-small" value="" checked>'
        }else{
            commit = '<input id="editCommit" type="checkbox" class="input-small" value="">'
        }

        var record_html = record_template.format(id,date,who,start,stop,interruptions,question,comments,commit,id)

        $('#'+record_id).html(record_html)
        $('#editDate').datepicker();
        $('#editStart').timepicker({
            showNowButton: true,
            showDeselectButton: true,
            defaultTime: '',  // removes the highlighted time for when the input is empty.
            showCloseButton: true
        });
        $('#editStop').timepicker({
            showNowButton: true,
            showDeselectButton: true,
            defaultTime: '',  // removes the highlighted time for when the input is empty.
            showCloseButton: true
        });


    });



}



function fetchRecordsOnLoad(){

    var assignment_id = parseInt($.QueryString["assignment_id"])

    fetchRecords(assignment_id)

}


function fetchRecords(assignment_id){

    var record_template = '<tr id="{11}"> \
        <th>{0} </th> \
        <th>{1} </th> \
        <th>{2} </th> \
        <th>{3} </th> \
        <th>{4} </th> \
        <th>{5} </th> \
        <th>{6} </th> \
        <th>{7} </th> \
        <th>{8} </th> \
        <th><button type="button" class="btn btn-warning" onclick="editRecords({9})">Edit</button> </th> \
        <th><button type="button" class="btn btn-danger" onclick="deleteRecords({10})">Delete</button> </th> \
    </tr>'


    var request = $.ajax({
        url: "assignment/"+ assignment_id +"/records",
        type: "GET",
        dataType: "json"
    });


    request.done(function( records ) {
        var record_html = ''
        $.each(records,function(index, element) {
            var id = option(element.id)
            var date = ''
            if(element.date != null){
                var date_array = element.date.split('-')
                date = date_array[1]+'/'+date_array[2]+'/'+date_array[0]
            }
            var who = option(element.who)
            var start = option(element.start)
            var stop = option(element.stop)
            var interruptions = option(element.interruptions)
            var question = option(element.question)
            var comments = option(element.comments)
            var commit = ''
            if(element.commit == true){
                commit = 'true'
            }

            var record = record_template.format(id,date,who,start,stop,interruptions,question,comments,commit,id,id,id)
            record_html  = record_html  + record
        })

        $( "#records" ).html( record_html  );
    });

}

function option(element){
    return element == null ? '' : element

}


/////////////////////////////RECORD FUNCTIONS END