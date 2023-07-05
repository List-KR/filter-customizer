// Conains errors related to JSON.
export class JSONError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JSONError'
    this.message = message
  }
}

// JSONInvaildError class is returned when the JSON itself is invaild.
export class JSONInvaildError extends JSONError {
  constructor(message: string) {
    super(message)
    this.name = 'JSONInvaildError'
    this.message = message
  }
}

// JSONFileNotFoundError class is returned when the JSON file is not found.
export class JSONFileNotFoundError extends JSONError {
  constructor(message: string) {
    super(message)
    this.name = 'JSONFileNotFoundError'
    this.message = message
  }
}

// JSONFormatError class is returned when the JSON format used in filter-customizer is invaild.
export class JSONFormatError extends JSONError {
  constructor(message: string) {
    super(message)
    this.name = 'JSONFormatError'
    this.message = message
  }
}