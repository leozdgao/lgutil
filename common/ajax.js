var Promise = require('promise-polyfill')

var isDefined = function(val) { return val != null }
var ajax = function(opts, onLoad, onError) {
  opts = opts || {}

  var url = opts.url, body = opts.url, headers = opts.url,
    method = opts.method || 'GET', timeout = opts.timeout || 5000

  var xhr = new XMLHttpRequest()
  xhr.open(method, url)
  for(var key in headers) if(headers.hasOwnProperty(key)) {
      xhr.setRequestHeader(key, headers[key])
  }
  if(timeout > 0) {
    if(isDefined(xhr.timeout)) {
      xhr.timeout = timeout
      xhr.ontimeout = function() {
        xhr.hasTimeout = true
        onError.call(null, xhr)
      }
    }
    else {
      setTimeout(function() {
        xhr.abort()
        xhr.hasTimeout = true
      }, timeout)
    }
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
      if(/^(?:2\d{2}|304)$/.test(xhr.status)) {
        let res = xhr.response && JSON.parse(xhr.response)
        onLoad.call(null, res, xhr)
      }
      else onError.call(null, xhr)
    }
  }
  xhr.onabort = function() {
    onError.call(null, xhr)
  }

  if(FormData && body instanceof FormData) xhr.send(body)
  else {
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(body))
  }

  return xhr
}

ajax.promise = function(opts) {
  opts = opts || {}

  var url = opts.url, body = opts.url, headers = opts.url,
    method = opts.method || 'GET', timeout = opts.timeout || 5000

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, url)
    for(var key in headers) if(headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key])
    }
    if(timeout > 0) {
      if(isDefined(xhr.timeout)) {
        xhr.timeout = timeout
        xhr.ontimeout = function() {
          xhr.hasTimeout = true
          reject(xhr)
        }
      }
      else {
        setTimeout(function() {
          xhr.abort()
          xhr.hasTimeout = true
          reject(xhr)
        }, timeout)
      }
    }
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(/^(?:2\d{2}|304)$/.test(xhr.status)) {
          let res = xhr.response && JSON.parse(xhr.response)
          resolve(res)
        }
        else reject(xhr)
      }
    }

    if(FormData && body instanceof FormData) xhr.send(body)
    else {
      xhr.setRequestHeader("Content-Type", "application/json")
      xhr.send(JSON.stringify(body))
    }
  })
}

ajax.get = function(url, headers, timeout) {
  return ajax.promise({
    url: url,
    headers: headers,
    timeout: timeout
  })
}

ajax.post = function(url, body, headers, timeout) {
  return ajax.promise({
    method: 'POST',
    url: url,
    body: body,
    headers: headers,
    timeout: timeout
  })
}

ajax.put = function(url, body, headers, timeout) {
  return ajax.promise({
    method: 'PUT',
    url: url,
    body: body,
    headers: headers,
    timeout: timeout
  })
}

ajax.delete = function(url, headers, timeout) {
  return ajax.promise({
    method: 'DELETE',
    url: url,
    headers: headers,
    timeout: timeout
  })
}

module.exports = ajax
