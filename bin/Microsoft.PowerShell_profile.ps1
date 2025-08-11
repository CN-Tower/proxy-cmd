Function proxyOn {
  $env:HTTP_PROXY = $env:PROXY_URL
  $env:HTTPS_PROXY = $env:PROXY_URL
  $env:NO_PROXY = $env:PROXY_NOC
  Write-Host "Proxy enabled: $env:PROXY_URL" -ForegroundColor Green
}

Function proxyOff {
  if (Test-Path Env:HTTP_PROXY) { Remove-Item Env:HTTP_PROXY -ErrorAction SilentlyContinue }
  if (Test-Path Env:HTTPS_PROXY) { Remove-Item Env:HTTPS_PROXY -ErrorAction SilentlyContinue }
  if (Test-Path Env:NO_PROXY) { Remove-Item Env:NO_PROXY -ErrorAction SilentlyContinue }
  Write-Host "Proxy disabled" -ForegroundColor Yellow
}

Set-Alias proxy-on proxyOn
Set-Alias proxy-off proxyOff
