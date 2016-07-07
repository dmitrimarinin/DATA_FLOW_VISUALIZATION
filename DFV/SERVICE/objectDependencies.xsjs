$.response.contentType = "text/html";

var path =$.request.parameters.get('path');
var query = "SELECT \"BASE_SCHEMA_NAME\", \"BASE_OBJECT_NAME\", \"BASE_OBJECT_TYPE\", \"BASE_VIEW_TYPE\", \"DEPENDENT_SCHEMA_NAME\", \"DEPENDENT_OBJECT_NAME\", \"DEPENDENT_OBJECT_TYPE\", \"DEPENDENT_VIEW_TYPE\" FROM \"_SYS_BIC\".\"DFV.MODEL/CV_OBJECT_DEPENDENCIES\" (\'PLACEHOLDER\' = (\'$$IP_PATH$$\','" + path + "'))";

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement(query);  
var rs = pstmt.executeQuery(); 

var data = [];
while (rs.next()){
                 
       data.push({
       "BASE_SCHEMA_NAME":rs.getNString(1),
       "BASE_OBJECT_NAME":rs.getNString(2),
       "BASE_OBJECT_TYPE":rs.getNString(3),
       "BASE_VIEW_TYPE":rs.getNString(4),
       "DEPENDENT_SCHEMA_NAME":rs.getNString(5),
       "DEPENDENT_OBJECT_NAME":rs.getNString(6),
       "DEPENDENT_OBJECT_TYPE":rs.getNString(7),
       "DEPENDENT_VIEW_TYPE":rs.getNString(8)
       });
       }

rs.close();
pstmt.close();
conn.close();

$.response.setBody(JSON.stringify(data)); 
$.response.contentType = 'application/json';    
$.response.status = $.net.http.OK;

