$(function () {

    var books = $("#books");
    var button = $("#button");
    var isbnInput = $("#isbn");
    var titleInput = $("#title");
    var authorInput = $("#author");
    var publisherInput = $("#publisher");
    var typeInput = $("#type");

    function Book(isbn, title, author, publisher, type) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.type = title;
    }

    books.on("click", ".book", function () {
        var id = $(this).data("id");
        var bookDetails = $(this).next();
        console.log("event click");
        $.get("http://localhost:8282/books/" + id)
            .done(function (res) {
                bookDetails.text(res.author + " - " + res.publisher);
            })
            .fail(function () {
                alert("Brak rekordu");
            })
    });


    function refreshBooks() {
        $.get("http://localhost:8282/books")
            .done(function (res) {
                books.empty();
                $(res).each(function (index, item) {
                    if (item !== null) {
                        var title = $("<div data-id='" + item.id + "'></div>")
                            .text("- " + item.title)
                            .addClass("book");
                        books.append(title);

                        var bookDetails = $("<div>");
                        bookDetails.text("...");
                        bookDetails.addClass("hidden details");
                        title.after(bookDetails);

                        title.click(function () {
                            bookDetails.toggleClass("hidden");
                        });
                    }
                })
            })
    }

    button.click(function (event) {
        var newBook = new Book(isbnInput.val(), titleInput.val(), authorInput.val(), publisherInput.val(), typeInput.val());
        $.ajax({
            url: "http://localhost:8282/books",
            type: "post", //typ połączenia
            contentType: 'application/json', //gdy wysyłamy dane czasami chcemy ustawić ich typ
            dataType: 'json', //typ danych jakich oczekujemy w odpowiedzi
            data: JSON.stringify(newBook)
        }).done(function () {
            refreshBooks();
        });


    });

    refreshBooks();


});


