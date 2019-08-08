import getAuthorizationHeader from './getAuthorizationHeader'

export function fetchAll ($axios) {
  const headers = getAuthorizationHeader()
  const filter = `StopID%20eq%20'290710'%20or%20StopID%20eq%20'300865'`
  return $axios.get(`https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/InterCity/1088?$filter=${filter}&$top=4&$format=JSON`, { headers })
}
