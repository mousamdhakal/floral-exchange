export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' mins ago'
  }
  return Math.floor(seconds) + ' sec ago'
}

export function filterPosts(posts, filter) {
  if (filter === 'all') {
    return posts
  } else {
    let filteredPost = []
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].type === filter) {
        filteredPost.push(posts[i])
      }
    }
    return filteredPost
  }
}

export function sortPosts(posts, filter) {
  if (filter === '') {
    return posts
  } else if (filter === 'date') {
    return invertArray(posts)
  } else if (filter === 'title') {
    return insertionSort(posts, 'title')
  }
}

// insertion sort
function insertionSort(inputArr, property) {
  let n = inputArr.length
  for (let i = 1; i < n; i++) {
    // Choosing the first element in our unsorted subarray
    let current = inputArr[i]
    // The last element of our sorted subarray
    let j = i - 1
    while (j > -1 && current[property] < inputArr[j][property]) {
      inputArr[j + 1] = inputArr[j]
      j--
    }
    inputArr[j + 1] = current
  }
  return inputArr
}

// customized sequential search
export function sequentialSearch(inputArr, propertyArray, value) {
  const filteredArray = []
  for (let i = 0; i < inputArr.length; i++) {
    for (let j = 0; j < propertyArray.length; j++) {
      if (inputArr[i][propertyArray[j]].includes(value)) {
        filteredArray.push(inputArr[i])
        break;
      }
    }
  }
  return filteredArray
}

export function invertArray(arr) {
  const invertedPosts = []
  for (let i = 0; i < arr.length; i++) {
    invertedPosts.push(arr[arr.length - 1 - i])
  }
  return invertedPosts
}
