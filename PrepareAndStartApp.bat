set /P id=Enter MongoDB folder path (Example: C:\Program Files\MongoDB\Server\3.6\bin):
@echo Unzipping
unzip -o "db-backup\sofomoTestDb.zip" -d "db-backup" 
@echo RestoringDB
start /b "" "%id%\mongorestore.exe" --db sofomoTestDb db-backup\sofomoTestDb
cd "server"
start /separate cmd /c "npm install && npm start" &
cd ".."
cd "web-client"
start /separate cmd /c "npm install && npm start" &
