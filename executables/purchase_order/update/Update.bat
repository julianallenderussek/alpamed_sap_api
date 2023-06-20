@echo off

IF EXIST "C:\Users\U002\Desktop\alpamed_sap_api\files\purchase_order\update\ordr.txt" ("C:\Program Files\SAP\Data Transfer Workbench\dtw.exe" -s C:\Users\U002\Desktop\alpamed_sap_api\executables\purchase_order\update\update.xml 
echo Se cargo ORDR Update) ELSE (echo ORDR Update no existe.)

pause
exit