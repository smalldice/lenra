import xp from '@heibanfe/xp-sdk'

export type HttpResType = 'get' | 'post' | 'put' | 'delete'

export interface WebReq {
  params?: { [index: string]: string } | {}
  forms?: any
}

/**
 * 解析路由参数
 */
const reg = /:[a-z|A-Z]+/g
function parseParams(url: string) {
  const ps = url.match(reg)

  if (!ps) {
    return []
  }

  return ps.map(k => k.replace(/\:/, ''))
}

/**
 * 按照url和params生成相应的url
 * @param url
 * @param params
 */
function genUrl(url: string, params: WebReq['params']) {
  if (!params) {
    return url
  }

  const ps = parseParams(url)
  ps.forEach(k => {
    const reg = new RegExp(':' + k)
    url = url.replace(reg, params[k])
  })

  // const path: string[] = []
  // for (const key of Object.keys(params)) {
  //   if (!ps.find(k => k === key)) {
  //     path.push(key + '=' + params[key])
  //   }
  // }

  // return url + (path.length > 0 ? '?' + path.join('&') : '')

  return url
}

interface Response<T> {
  code: number
  data: T
}

export function Api<T>(url: string, method: HttpResType, req: WebReq): Promise<Response<T>> {
  switch (method) {
    case 'get':
      return xp.getAsync(genUrl(url, req.params), req.forms)
    case 'post':
      return xp.postAsync(genUrl(url, req.params), req.forms)
    case 'delete':
      return xp.deleteAsync(genUrl(url, req.params), req.forms)
    case 'put':
      return xp.putAsync(genUrl(url, req.params), req.forms)
  }
}

export function get<T>(url: string, params?: WebReq['params'], forms?): Promise<Response<T>> {
  return Api<T>(url, 'get', {
    params,
    forms
  })
}

export function put<T>(url: string, params?: WebReq['params'], forms?): Promise<Response<T>> {
  return Api<T>(url, 'put', {
    params,
    forms
  })
}

export function deleteAsync<T>(url: string, params?: WebReq['params'], forms?): Promise<Response<T>> {
  return Api<T>(url, 'delete', {
    params,
    forms
  })
}

export function post<T>(url: string, params?: WebReq['params'], forms?): Promise<Response<T>> {
  if (url.match(/:/)) {
    // 如果路由是挂参的url，则第一个params肯定是params，否则就是forms
    return Api<T>(url, 'post', {
      params,
      forms
    })
  } else {
    return Api<T>(url, 'post', {
      forms: params
    })
  }
}

const webapi = {
  get,
  post,
  put,
  delete: deleteAsync
}

export default webapi
