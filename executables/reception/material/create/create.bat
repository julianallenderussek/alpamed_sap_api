@echo off

IF EXIST "C:\Users\U002\Desktop\alpamed_sap_api\files\reception\create\ordn.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\alpamed_sap_api\executables\reception\material\create\create.xml 
echo Se cargo ORDN Recepcion Created Succesfully) ELSE (echo No File found - C:\Users\U002\Desktop\alpamed_sap_api\files\purchase_order\create\ordr.txt)

exit