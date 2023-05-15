@echo off

IF EXIST "C:\Users\U002\Desktop\Archivos_Prueba\upload\ordr_actualizacion.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\Archivos_Prueba\upload\Update.xml 
echo Se cargo ORDR Update) ELSE (echo ORDR Update no existe.)

pause
exit