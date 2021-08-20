const { accessSync, constants, readFileSync, writeFileSync } = require('fs')
const path = require('path')
const crypto = require('crypto')

class DB {
  #data = {
    books: new Map(),
    authors: new Map()
  }
  #dbPath = path.resolve(__dirname, '../db/db.json')

  constructor (dbPath = null) {
    if (dbPath) this.dbPath = dbPath
    try {
      accessSync(this.#dbPath, constants.F_OK)
      this.load()
    } catch (error) {
      this.save()
    }
  }

  load () {
    const readData = JSON.parse(readFileSync(this.#dbPath, 'utf8'))
    this.#data = {
      books: new Map(Array.isArray(readData.books) ? readData.books : new Map()),
      authors: new Map(Array.isArray(readData.authors) ? readData.authors : new Map()),
    }
  }

  save () {
    return writeFileSync(this.#dbPath, JSON.stringify({
      books: [...this.#data.books.entries()],
      authors: [...this.#data.authors.entries()]
    }))
  }

  addBook (book) {
    const id = crypto.createHash('sha256').update(book.title + book.author).digest('hex')
    if (this.getBook(id)) throw new Error(`Book "${book.title}" by "${this.getAuthor(book.author).name}" already exists`)
    if (!this.getAuthor(book.author)) throw new Error(`Author "${book.author}" not found`)

    this.#data.books.set(id, { ...book, id })
    return this.getBook(id)
  }

  updateBook (bookId, updateData) {
    if (!this.#data.books.has(bookId)) throw new Error(`Book "${bookId}" not found`)
    const { id, ...data } = updateData
    this.#data.books.set(bookId, { ...this.#data.books.get(bookId), ...data })
    return this.getBook(bookId)
  }

  deleteBook (id) {
    this.#data.books.delete(id)
    return this
  }

  getBook (id) {
    return this.#data.books.get(id)
  }

  listBooks () {
    return [...this.#data.books.values()]
  }

  // ------

  addAuthor (author) {
    const id = crypto.createHash('sha256').update(author.name).digest('hex')
    if (this.getAuthor(id)) throw new Error(`Author "${author.name}" already exists`)
    this.#data.authors.set(id, { ...author, id })
    return this.getAuthor(id)
  }

  updateAuthor (authorId, updateData) {
    if (!this.#data.authors.has(authorId)) throw new Error(`Author "${authorId}" not found`)
    const { id, ...data } = updateData
    this.#data.authors.set(authorId, { ...this.#data.authors.get(authorId), ...data })
    return this.getAuthor(authorId)
  }

  deleteAuthor (id) {
    this.#data.authors.delete(id)
    return this
  }

  listAuthors () {
    return [...this.#data.authors.values()]
  }

  getAuthor (id) {
    return this.#data.authors.get(id)
  }

  get data () {
    return this.#data
  }
}

module.exports = DB
