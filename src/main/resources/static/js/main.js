$(function () {

    const appendBook = function (data) {
        var bookCode = '<a href="#" class="book-link" data-id="' +
            data.id + '">' + data.name + '</a><br>';
        $('#book-list')
            .append('<div>' + bookCode + '</div>');
    };

    //Loading books on load page
//    $.get('/books/', function(response)
//    {
//        for(i in response) {
//            appendBook(response[i]);
//        }
//    });

    //Show adding book form
    $('#show-add-book-form').click(function () {
        $('#book-form').css('display', 'flex');
    });

    //Closing adding book form
    $('#book-form').click(function (event) {
        if (event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Getting book
    $(document).on('click', '.book-link', function () {
        var link = $(this);
        var bookId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/todos/' + bookId,
            success: function (response) {
                var code = '<span>Исполнитель:' + response.user + '</span>';
                link.parent().append(code);
            },
            error: function (response) {
                if (response.status == 404) {
                    alert('Книга не найдена!');
                }
            }
        });
        return false;
    });

    //Adding book
    $('#save-book').click(function () {
        var data = $('#book-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/todos/',
            data: data,
            success: function (response) {
                $('#book-form').css('display', 'none');
                var book = {};
                book.id = response;
                var dataArray = $('#book-form form').serializeArray();
                for (i in dataArray) {
                    book[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendBook(book);
            }
        });
        return false;
    });
    //Deleting
    $(document).on('click', '.book-delete', function () {
        var link = $(this);
        var bookId = link.data('id');
        alert('Книга удалена! ' + bookId);
        $.ajax({
            method: "DELETE",
            url: '/todos/' + bookId,
            success: function (response) {
                alert('Книга удалена!');
            },
            error: function (response) {
                alert('Книга не удалена!');
            }
        });
        return false;
    });
    //Edit
    $(document).on('click', '.book-edit', function () {
        $('#book-form').css('display', 'flex');
      //
        var stemp = $(this) ;
        var boo =  $('#form');
        alert('Книга ! ' + stemp.attr("user") + " " + stemp.attr("dateStart"));
        $(':input[name]', boo).val(function () {

            alert('Книга 124142! ' + stemp.attr(this.name));

            return $(':input[name=' + this.name + ']', $(this.form)).val();
        });
        /* var stemp = ;
         alert('Книга ! ' + stemp.attr("user") + stemp.attr("dateStart"));
         $(':input[name="name"]',':input[name="dateStart"]').val(stemp.attr("user"),stemp.attr("dateStart"));
   */

    });

    //Closing eddting book form
    // $('#book-form-edit').click(function(event){
    //     if(event.target === this) {
    //         $(this).css('display', 'none');
    //     }
    // });
});