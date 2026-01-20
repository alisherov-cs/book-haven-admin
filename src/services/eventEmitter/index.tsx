import EventEmitter from "eventemitter3";

export const eventEmitter = new EventEmitter();

export enum AppEvents {
    GANER_FORM_CLEAR = "clear:ganerForm",
    GANER_CREATED = "created:ganer",
    ON_GANER_EDIT = "onEdit:ganer",
    AUTHORS_FORM_CLEAR = "clear:authorsForm",
    AUTHOR_CREATED = "created:author",
    ON_AUTHOR_EDIT = "onEdit:author",
    BOOKS_FORM_CLEAR = "clear:booksForm",
    BOOK_CREATED = "created:book",
    ON_BOOK_EDIT = "onEdit:book",
}
