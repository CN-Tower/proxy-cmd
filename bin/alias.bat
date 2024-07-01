@echo off
doskey proxy-on=set HTTP_PROXY=%PROXY_URL% $T HTTPS_PROXY=%PROXY_URL%
doskey proxy-off=set HTTP_PROXY= $T HTTPS_PROXY=
