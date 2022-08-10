function noneStr(str,len){
	return str.length>len?str.slice(0,len)+"...":str;
}
export default noneStr