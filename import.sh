cd logs
gunzip -r . -f
mongoimport -d localytics -c users --type csv --file ./tests/ios_users.csv --headerline
find . -regex ".*\.log" | xargs -L 1 mongoimport -d localytics -c tokens --type json --file
