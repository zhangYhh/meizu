<?php
 header("Content-type:text/html;charset=utf-8");

 $Uphone=$_GET['myphone'];
 $password=$_GET['passw'];


//处理
if(($Uphone!="")&&($password!="")){
	//建立连接
	 $conn=mysql_connect("localhost","root","root");
	 if(!$conn){
	 	die("连接失败");

	 }
	//选择数据库
	 mysql_select_db("regester",$conn);

	 //执行sql语句

	 // 1.查询
	 $sqlstr="select * from login where myphone='$Uphone' and passw='$password'"; 
	 $result=mysql_query($sqlstr,$conn);
	 if(mysql_num_rows($result)>0){
	 	mysql_close($conn);//先处理完后端程序
	 	echo "1";
	 }else{
	 	echo "0";

	 }


}else{
	echo"请输入用户名或密码！";
}