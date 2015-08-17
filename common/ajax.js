var Promise = require('promise-polyfill')

var isDefined = function (val) { return val != null }
var ajax = function (opts, fulfill, reject) {
  opts = opts || {}

  var url = opts.url, body = opts.body, headers = opts.headers,
    method = opts.method || 'GET', timeout = opts.timeout || 5000

  var xhr = new XMLHttpRequest()
  xhr.open(method, url)
  xhr.withCredentials = !!opts.withCredentials
  for (var key in headers) if (headers.hasOwnProperty(key)) {
    xhr.setRequestHeader(key, headers[key])
  }
  if (timeout > 0) {
    if (isDefined(xhr.timeout)) {
      xhr.timeout = timeout
      xhr.ontimeout = function () {
        xhr.hasTimeout = true
        reject({ timeout: true })
      }
    }
    else {
      setTimeout(function () {
        xhr.abort()
        xhr.hasTimeout = true
      }, timeout)
    }
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var res
      try {
        res = xhr.response && JSON.parse(xhr.response)
      }
      catch(e) { res = xhr.response }

      if (/^(?:2\d{2}|304)$/.test(xhr.status)) {
        fulfill(res)
      }
      else reject(res)
    }
  }
  xhr.onabort = function () {
    reject({ abort: true })
  }

  if (FormData && body instanceof FormData) xhr.send(body)
  else {
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))
  }

  return xhr
}

ajax.promise = function (opts) {
  return new Promise(function (resolve, reject) {
    ajax(opts, resolve, reject)
  })
}

ajax.get = function (url, headers, timeout) {
  return ajax.promise({
    url: url,
    headers: headers,
    timeout: timeout
  })
}

ajax.post = function (url, body, headers, timeout) {
  return ajax.promise({
    method: 'POST',
    url: url,
    body: body,
    headers: headers,
    timeout: timeout
  })
}

ajax.put = function (url, body, headers, timeout) {
  return ajax.promise({
    method: 'PUT',
    url: url,
    body: body,
    headers: headers,
    timeout: timeout
  })
}

ajax.delete = function (url, headers, timeout) {
  return ajax.promise({
    method: 'DELETE',
    url: url,
    headers: headers,
    timeout: timeout
  })
}

module.exports = ajax
