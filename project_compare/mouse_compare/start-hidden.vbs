Option Explicit
Dim shell, fso, projDir, logDir, logFile, cmd
Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

projDir = "D:\project\project_compare\mouse_compare"
logDir = projDir & "\logs"
If Not fso.FolderExists(logDir) Then fso.CreateFolder(logDir)
logFile = logDir & "\startup.log"

cmd = "cmd /c """"" & projDir & "\start.bat"" >> """ & logFile & """ 2>&1"""
shell.Run cmd, 0, False
