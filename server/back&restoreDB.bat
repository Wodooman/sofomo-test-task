cd C:\Program Files\MongoDB\Server\3.6\bin
mongodump --db sofomoTestDb --out D:/backup

mongorestore --db sofomoTestDb D:\backup\sofomoTestDb