var Promise = require('promise-polyfill')
var forEach = require('lodash/collection/forEach')
var assign = require('lodash/object/assign')

var isDefined = function (val) { return val != null }

function request (opts) {
  var url = opts.url
  if (!isDefined(url)) throw new Error('Request need an URL.')

  var method = opts.method || 'GET'
  var headers = opts.headers || {}
  var body = opts.body
  var timeout = opts.timeout || 5000
  var withCredentials = opts.withCredentials || false

  var xhr = new XMLHttpRequest()
  var getHeaders = function () {
    return xhr.getAllResponseHeaders().split('\n')
      .reduce(function (header, entry) {
        var temp = entry.split(': ')
        var k = temp[0], v = temp[1]
        if (k && v) header[k] = v
        return header
      }, {})
  }

  var fetch = new Promise(function (resolve, reject) {
    xhr.open(method, url)
    forEach(headers, function (val, key) {
      xhr.setRequestHeader(key, val)
    })

    // hadnle timeout
    if (timeout > 0) {
      if (isDefined(xhr.timeout)) {
        xhr.timeout = timeout
        xhr.ontimeout = function () {
          xhr.hasTimeout = true
          reject({ type: 'timeout' })
        }
      }
      else {
        setTimeout(function () {
          xhr.abort()
          xhr.hasTimeout = true
        }, timeout)
      }
    }

    // handle response
    xhr.onload = function () {
      var status = xhr.status
      var response = {
        status: status,
        headers: getHeaders(),
        body: xhr.response || xhr.responseText
      }

      if (/^2|304/.test(status)) resolve(response)
      else {
        response.type = 'error'
        reject(response)
      }
    }
    xhr.onerror = function () {
      reject({
        type: 'error',
        status: xhr.status,
        headers: getHeaders(),
        body: xhr.response || xhr.responseText
      })
    }
    xhr.onabort = function () {
      reject({ type: xhr.hasTimeout? 'timeout': 'abort' })
    }
    xhr.withCredentials = withCredentials
    xhr.send(body)
  })

  return {
    then: fetch.then.bind(fetch),
    catch: fetch.catch.bind(fetch),
    abort: xhr.abort.bind(xhr) // abortable
  }
}

[ 'get', 'post', 'put', 'delete' ].forEach(function (method) {
  request[method] = function (url, body, opts) {
    if (method === 'get') {
      opts = body
      body = void 0
    }

    return request(assign({
      url: url,
      method: method.toUpperCase(),
      body: body
    }, opts))
  }
})

module.exports = request
