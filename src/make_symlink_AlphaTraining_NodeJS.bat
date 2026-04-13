@echo off

::================= BatchGotAdmin =================::
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting administrative privileges...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)
::================= BatchGotAdmin =================::

SET myDir=%~dp0
echo.

IF NOT EXIST "C:\WebSites\Alphatraining\htdocs" mkdir "C:\WebSites\Alphatraining\htdocs"
IF EXIST "C:\WebSites\Alphatraining\htdocs\NodeJS" rd /s /q "C:\WebSites\Alphatraining\htdocs\NodeJS"
mklink /j "C:\WebSites\Alphatraining\htdocs\NodeJS" "%myDir%"


:exit
SET myDir=

echo.
echo.
echo.
echo press any key
pause >nul
