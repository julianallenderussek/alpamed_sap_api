@echo off

IF EXIST "C:\Users\U002\Desktop\alpamed_sap_api\files\delivery\create\ordn.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\alpamed_sap_api\executables\delivery\load\create\create.xml 
echo Se cargo ORDN Entrega Created Succesfully) ELSE (echo No File found - C:\Users\U002\Desktop\alpamed_sap_api\files\delivery\load\create\ordr.txt)

exit