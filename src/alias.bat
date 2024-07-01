@echo off
doskey proxy-on=set HTTP_PROXY=%PROXY_URL% $T set HTTPS_PROXY=%PROXY_URL%
doskey proxy-off=set HTTP_PROXY=$T set HTTPS_PROXY=
