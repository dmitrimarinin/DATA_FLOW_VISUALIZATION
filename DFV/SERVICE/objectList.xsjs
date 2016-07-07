$.response.contentType = "text/html";

var path =$.request.parameters.get("path");
var query = "SELECT \"SCHEMA_NAME\", \"OBJECT_NAME\", \"OBJECT_TYPE\", \"VIEW_TYPE\", \"ACTIVATED_BY\" FROM \"_SYS_BIC\".\"DFV.MODEL/CV_OBJECT_LIST\" (\'PLACEHOLDER\' = (\'$$IP_PATH$$\',\'" + path + "\'))";

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement(query);  
var rs = pstmt.executeQuery(); 

var data = [];
while (rs.next()){
                 
       data.push({
       "SCHEMA_NAME":rs.getNString(1),
       "OBJECT_NAME":rs.getNString(2),
       "OBJECT_TYPE":rs.getNString(3),
       "VIEW_TYPE":rs.getNString(4),
       "ACTIVATED_BY":rs.getNString(5)
       });
       }

rs.close();
pstmt.close();
conn.close();

$.response.setBody(JSON.stringify(data)); 
$.response.contentType = 'application/json';    
$.response.status = $.net.http.OK;

