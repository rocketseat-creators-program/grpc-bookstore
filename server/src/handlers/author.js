function GetAuthor (database) {
  return (req, callback) => {

  }
}

function UpdateAuthor (database) {
  return (req, callback) => {

  }
}

function DeleteAuthor (database) {
  return (req, callback) => {

  }
}

function ListAuthor (database) {
  return (req, callback) => {

  }
}

function CreateAuthor (database) {
  return (req, callback) => {

  }
}


module.exports = (databaseInstance) => {
  return {
    GetAuthor: GetAuthor(databaseInstance),
    UpdateAuthor: UpdateAuthor(databaseInstance),
    DeleteAuthor: DeleteAuthor(databaseInstance),
    ListAuthor: ListAuthor(databaseInstance),
    CreateAuthor: CreateAuthor(databaseInstance)
  }
}
