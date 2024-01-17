@echo off

IF EXIST "C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\files\purchase_order\create\ordr.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\executables\purchase_order\create\create.xml 
echo Se cargo ORDR Created Succesfully) ELSE (echo No File found - C:\Users\U002\Desktop\API-WMS-SAP\dev\alpamed_sap_api\files\purchase_order\create\ordr.txt)

exit