@echo off

IF EXIST "C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\files\delivery\create\ordn.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\executables\delivery\material\create\create.xml 
echo Se cargo ORDN Entrega Created Succesfully) ELSE (echo No File found - C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\files\delivery\create\ordr.txt)

exit