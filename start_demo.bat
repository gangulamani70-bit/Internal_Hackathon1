@echo off
setlocal enabledelayedexpansion
title AgriPrice Connect - SIH 2026 Platform
color 0A

echo ====================================================================
echo      AgriPrice Connect -- SIH 2026 Problem ID: SIH26132
echo      Strengthening Market Linkages and Price Discovery
echo      Government of Maharashtra -- MSIS / Innovation
echo ====================================================================
echo.

:: Ensure we are in the script's directory
cd /d "%~dp0"

:: Check if production build exists; if not, build it automatically
if not exist "dist\index.html" (
    echo [Setup] Production build not found in dist\. Building project...
    call npm run build
    if errorlevel 1 (
        echo [Warning] Build encountered a warning. Attempting to proceed...
    )
)

:: Locate Python or Py launcher
set PYTHON_CMD=
where python >nul 2>&1
if not errorlevel 1 (
    set PYTHON_CMD=python
) else (
    where py >nul 2>&1
    if not errorlevel 1 (
        set PYTHON_CMD=py
    )
)

if defined PYTHON_CMD (
    echo Starting local demo server via %PYTHON_CMD% ...
    %PYTHON_CMD% server.py
) else (
    echo [Notice] Python not found on PATH. Attempting fallback via Vite Preview...
    where npm >nul 2>&1
    if not errorlevel 1 (
        echo Launching via npm run preview on http://localhost:8000 ...
        call npm run preview -- --port 8000 --open
    ) else (
        echo [ERROR] Neither Python nor Node/npm could be found on your PATH.
        echo Please ensure Python 3.x or Node.js is installed to run the local demo.
        pause
    )
)
pause

