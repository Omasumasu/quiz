# This is a sample code

## Quiz
1. Create a connection to mysql only upon successful connection start the node server on port 8085.
2. Write an with an API "getSampleData"(POST) in json format which has ouput of {"status":"ok"} 
on successful execution.
The API should only give successful response only if the request header has "x-api-key" with value "xyHjsky" in it.
else response should be {"status":"unauthorized"}

for eg : localhost:8085/getSmapleData(POST with Header)