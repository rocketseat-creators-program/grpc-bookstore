function GetAuthor (database) {
  return (call, callback) => {
    try {
      return callback(null, { authors: assertAuthor(database, call.request.authorId) })
    } catch (error) {
      return callback(error, null)
    }
  }
}

function UpdateAuthor (database) {
  return (call, callback) => {
    const { authorId, data } = call.request
    try {
      assertAuthor(database, authorId)
      const newAuthor = database.updateAuthor(authorId, data)
      database.save()
      return callback(null, { authors: newAuthor })
    } catch (error) {
      return callback(error, null)
    }
  }
}

function DeleteAuthor (database) {
  return (call, callback) => {
    const { authorId } = call.request
    try {
      assertAuthor(database, authorId)
      database.deleteAuthor(authorId)
      database.save()
      return callback(null, {})
    } catch (error) {
      return callback(error, null)
    }
  }
}

function ListAuthor (database) {
  return (_, callback) => {
    return callback(null, { authors: database.listAuthors() })
  }
}

function CreateAuthor (database) {
  return (call, callback) => {
    const { author } = call.request
    try {
      const newAuthor = database.addAuthor(author)
      database.save()
      return callback(null, { authors: newAuthor })
    } catch (error) {
      return callback(error, null)
    }
  }
}

function assertAuthor (database, id) {
  const author = database.getAuthor(id)
  if (!author) throw new Error(`Author ${id} not found`)
  return author
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
