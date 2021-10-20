const NodeCache = require('node-cache')
const Boom = require('@hapi/boom')

const hashCache = new NodeCache()
setHashVariables(hashCache)

function setHashVariables(cache) {
  let mathPow = Math.pow
  let maxWord = mathPow(2, 32)

  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  let hash = []
  let lengthProperty = 'length'

  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  let k = []
  let primeCounter = k[lengthProperty]

  let isComposite = {}
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (let i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate
      }
      hash[primeCounter] = (mathPow(candidate, 0.5) * maxWord) | 0
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0
    }
  }

  // Set the constants and value on cache and set expiry unlimited
  cache.set('initialHash', hash, 0)
  cache.set('roundConstants', k, 0)
}

const calculateSHA = (ascii) => {
  const rotateRight = (value, amount) => {
    return (value >>> amount) | (value << (32 - amount))
  }

  var mathPow = Math.pow
  var maxWord = mathPow(2, 32)
  var i, j // Used as a counter across the whole file
  var result = ''
  var words = []
  var lengthProperty = 'length'
  var asciiBitLength = ascii[lengthProperty] * 8
  var hash = hashCache.get('initialHash')
  var k = hashCache.get('roundConstants')

  // Append '1' bit (plus zero padding)
  ascii += '\x80'
  // More zero padding
  while ((ascii[lengthProperty] % 64) - 56) ascii += '\x00'

  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i)

    // ASCII check: only accept characters in range 0-255
    if (j >> 8) return
    words[i >> 2] |= j << (((3 - i) % 4) * 8)
  }
  words[words[lengthProperty]] = (asciiBitLength / maxWord) | 0
  words[words[lengthProperty]] = asciiBitLength

  // process each chunk
  for (j = 0; j < words[lengthProperty]; ) {
    var w = words.slice(j, (j += 16)) // The message is expanded into 64 words as part of the iteration
    var oldHash = hash
    // This is now the "working hash", often labelled as variables a...g
    // (we have to truncate as well, otherwise extra entries at the end accumulate
    hash = hash.slice(0, 8)

    for (i = 0; i < 64; i++) {
      var i2 = i + j
      // Expand the message into 64 words
      // Used below if
      var w15 = w[i - 15],
        w2 = w[i - 2]

      // Iterate
      var a = hash[0],
        e = hash[4]
      var temp1 =
        hash[7] +
        (rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25)) + // S1
        ((e & hash[5]) ^ (~e & hash[6])) + // ch
        k[i] +
        // Expand the message schedule if needed
        (w[i] =
          i < 16
            ? w[i]
            : (w[i - 16] +
                (rotateRight(w15, 7) ^ rotateRight(w15, 18) ^ (w15 >>> 3)) + // s0
                w[i - 7] +
                (rotateRight(w2, 17) ^ rotateRight(w2, 19) ^ (w2 >>> 10))) | // s1
              0)
      // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
      var temp2 =
        (rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22)) + // S0
        ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])) // maj

      hash = [(temp1 + temp2) | 0].concat(hash) // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
      hash[4] = (hash[4] + temp1) | 0
    }

    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j + 1; j--) {
      var b = (hash[i] >> (j * 8)) & 255
      result += (b < 16 ? 0 : '') + b.toString(16)
    }
  }
  return result
}

/**
 * Function to hash the password using SHA-256 and salt if provided
 * @param { string } rawPass - the password to be hashed
 * @param { object } [options={}] - object containing salt and rounds
 * @returns {string}
 */
const hashPassword = (password, options = {}) => {
  // salt is optional, if not provided it will be set to current timestamp
  const salt = options.salt ? options.salt : new Date().getTime()

  //rounds is optional, if not provided it will be set to 10
  const rounds = options.rounds ? options.rounds : 10

  let hashed = calculateSHA(password + salt)
  for (let i = 0; i <= rounds; i++) {
    hashed = calculateSHA(hashed)
  }
  return `${salt}$${rounds}$${hashed}`
}

/**
 * Function to compare raw and hashed password 
 * @param {string} rawPassword - the raw password
 * @param { string } hashedPassword - the hashed password
 * @returns
 */
const comparePasswords = (rawPassword, hashedPassword) => {
  try {
    const [salt, rounds] = hashedPassword.split('$')
    const hashedRawPassword = hashPassword(rawPassword, { salt, rounds })
    return hashedPassword === hashedRawPassword
  } catch (error) {
    throw Boom.badData(error.message)
  }
}

module.exports = {
  setHashVariables,
  calculateSHA,
  hashPassword,
  comparePasswords
}
