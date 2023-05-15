@echo off

IF EXIST "C:\Users\U002\Desktop\Archivos_Prueba\create\ejemplo_ordr_create.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\Archivos_Prueba\create\Create.xml 
echo Se cargo ORDR Create) ELSE (echo ORDR Create no existe.)

pause
exit