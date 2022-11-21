import { useState, createContext } from 'react';

const BookContext = createContext();

function BookProvider({ children }) {
    const [bookList, setBookList] = useState(new Map());
    const [newComment, setNewComment] = useState();
    const [displayModal, setDisplayModal] = useState(false);

    const handleSetDisplayModal = (data) => {
        setDisplayModal(data);
    };

    const handleSetNewComment = (comment) => {
        setNewComment(comment);
    };

    const handleSetBookList = (bookList) => {
        bookList.forEach((item) => {
            let book = {
                coverImage: item.coverImage,
                author: item.author,
                title: item.title,
                releaseDate: item.releaseDate,
                numberOfPage: item.numberOfPage,
                description: item.description,
            };
            setBookList((pre) => {
                return pre.set(item._id, book);
            });
        });
    };

    const values = {
        bookList,
        handleSetBookList,
        newComment,
        handleSetNewComment,
        displayModal,
        handleSetDisplayModal,
    };

    return <BookContext.Provider value={values}>{children}</BookContext.Provider>;
}

export { BookContext, BookProvider };
