@echo off
REM NEXUS Batch Wrapper for PowerShell Script
REM Run this in CMD to start the project.

powershell -ExecutionPolicy Bypass -File "%~dp0run.ps1"
pause
