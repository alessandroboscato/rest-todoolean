// Todolist con chiamate CRUD all'API  http://157.230.17.132:3007/todos

$(document).ready(function(){

  //READ
  // funzione che stampa la lista dei to do presenti nell'api
  createList();

  // CREATE
  // funzione che aggiunge un elemento

  $("#send-data").click(function(){
    var inputUser = $("#input-data").val();
    if (inputUser != "") {

      // CREATE

      $.ajax({
        "url": "http://157.230.17.132:3007/todos",
        "method": "POST",
        "data": {
          "text": inputUser
        },
        "success": function(data){
          renderData(data);
        },
        "error": function(){
          alert();
        }
      });
    }
    $("#input-data").val("");
  })

  $("#to-do-list").on("click", ".fa-edit", function(){
    $(this).next(".update").toggle();
    })

  $(document).on("click", "#send-modified-data", function(){
    var todoId = $(this).parents("li.modify").attr("data-attribute");
    var modifyListItem = $(this).siblings("#modify-data").val();
    if (modifyListItem != "") {
      $.ajax({
        // UPDATE
        "url": "http://157.230.17.132:3007/todos/" + todoId,
        "method": "PATCH",
        "data": {
          "text": modifyListItem
        },
        "success": function(){
          alert("Hai modificato con successo la voce della lista");
          $("#to-do-list").html("");
          createList();
        },
        "error": function(){
          alert("Qualcosa è andato storto");
        }
      })
    }
  });

  $(document).on("click", ".fa-times", function(){
    var toDeleteId = $(this).parents("li.modify").attr("data-attribute");

    // DELETE

    $.ajax({
      "url": "http://157.230.17.132:3007/todos/" + toDeleteId,
      "method": "DELETE",
      "success": function(data){
        alert("Hai cancellato l'elemento selezionato");
        $("#to-do-list").html("");
        createList();
      },
      "error": function(){
        alert("Qualcosa è andato storto");
      }
    });
  });





});

// -----------------------------
// functions
// -----------------------------

function createList(){
  $.ajax({
    "url": "http://157.230.17.132:3007/todos",
    "method": "GET",
    "success": function(data){
      for (var i = 0; i < data.length; i++) {
        renderData(data[i]);
      }
    },
    "error": function(){
      alert();
    }
  });
}

function renderData(data){
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  var context = {
    "id": data.id,
    "text": data.text
  };
  var html = template(context);
  $("#to-do-list").append(html)
}
