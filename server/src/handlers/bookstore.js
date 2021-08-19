function GetBook (database) {
  return (req, callback) => {

  }
}

function UpdateBook (database) {
  return (req, callback) => {

  }
}

function DeleteBook (database) {
  return (req, callback) => {

  }
}

function ListBook (database) {
  return (req, callback) => {

  }
}

function CreateBook (database) {
  return (req, callback) => {

  }
}


module.exports = (database) => {
  return {
    GetBook: GetBook(database),
    UpdateBook: UpdateBook(database),
    DeleteBook: DeleteBook(database),
    ListBook: ListBook(database),
    CreateBook: CreateBook(database)
  }
}
