import JsSHA from 'jssha'

export default function getAuthorizationHeader () {
  const AppID = '3d37e7f9f56447f3b360b3482741d1a4'
  const AppKey = 'rUFMgXbOnss_Q2m6Gf1aNNVsyCc'

  const GMTString = new Date().toGMTString()
  const ShaObj = new JsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  // eslint-disable-next-line no-useless-escape
  const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"'

  return {
    Authorization,
    'X-Date': GMTString
  }
}
