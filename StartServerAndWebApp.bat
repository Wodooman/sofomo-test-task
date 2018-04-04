cd "server"
start /separate cmd /c "npm start" &
cd ".."
cd "web-client"
start /separate cmd /c "npm start" &
exit