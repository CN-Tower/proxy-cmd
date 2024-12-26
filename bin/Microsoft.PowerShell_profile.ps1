Function proxyOn(){
  $env:HTTP_PROXY = $env:PROXY_URL
  $env:HTTPS_PROXY = $env:PROXY_URL
  $env:NO_PROXY = $env:PROXY_NOC
}

Function proxyOff(){
  Remove-Item Env:HTTP_PROXY
  Remove-Item Env:HTTPS_PROXY
  Remove-Item Env:NO_PROXY
}

Set-Alias proxy-on proxyOn
Set-Alias proxy-off proxyOff
