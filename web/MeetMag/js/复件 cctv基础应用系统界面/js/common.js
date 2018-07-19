function showDate() 
{
	var sWeek = new Array("日","一","二","三","四","五","六");
	var dNow = new Date();
	var sValue = dNow.getYear()+"年"+(dNow.getMonth()+1)+"月"+dNow.getDate()+"日"+
				 "  星期"+sWeek[dNow.getDay()];
	id_spanDate.innerText = sValue;
}	
//显示当前时间
function showTime() 
{
	var tNow = new Date();
	var nValue;
	var sValue;
	
	nValue = tNow.getHours();
	sValue = (nValue<10?"0"+nValue:nValue);
	
	nValue = tNow.getMinutes();
	sValue += ":"+(nValue<10?"0"+nValue:nValue);
	
	nValue = tNow.getSeconds();
	sValue += ":"+(nValue<10?"0"+nValue:nValue);
	
	id_spanTime.innerText = sValue;
}
function getCookieVal(offset)
{
	var endStr=document.cookie.indexOf(";",offset);
	if(endStr==-1)
	endStr=document.cookie.length;
	return unescape(document.cookie.substring(offset,endStr));
}
function getCookie(name)
{
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen)
	{
		var j=i+alen;
		if(document.cookie.substring(i,j)==arg)
		return getCookieVal(j);
		i=document.cookie.indexOf(" ",i)+1;
		if(i==0) break;
	}
	return null;
}
function TRS_display_search()
{

	var targetText = document.getElementById("searchDiv");
	var targetDiv = document.getElementById("search");
	if("object"==typeof(targetText))
	{
		if(targetDiv.style.display!='block')
		{	
			targetDiv.style.display='block';
			targetText.innerText="- 关闭";
			document.cookie="search=1;expires=exp.getTime()+(3600*60*60*1000);";
		}
		else
		{
			targetDiv.style.display='none';
			targetText.innerText="+ 打开";
			document.cookie="search=0;expires=exp.getTime()+(3600*60*60*1000);";
		}
	}
	setIFrameSize('main','TBnewsList','search',false)
}

function TRS_display_search1()
{

	var targetText = document.getElementById("searchDiv1");
	var targetDiv = document.getElementById("search1");
	if("object"==typeof(targetText))
	{
		if(targetDiv.style.display!='block')
		{	
			targetDiv.style.display='block';
			targetText.innerText="- 关闭";
			document.cookie="search=1;expires=exp.getTime()+(3600*60*60*1000);";
		}
		else
		{
			targetDiv.style.display='none';
			targetText.innerText=+ "打开";
			document.cookie="search=0;expires=exp.getTime()+(3600*60*60*1000);";
		}
	}
}

function TRS_display_search3()
{

	var targetText = document.getElementById("searchDiv3");
	var targetDiv = document.getElementById("idSearchWord1");
	if((targetText!=null)&&(targetDiv!=null))
	{
		if("object"==typeof(targetText))
		{
			if(targetDiv.style.display!='block')
			{	
				targetDiv.style.display='block';
				targetText.innerText="- 关闭";
				document.cookie="search3=1;expires=exp.getTime()+(3600*60*60*1000);";
			}
			else
			{
				targetDiv.style.display='none';
				targetText.innerText="+ 打开";
				document.cookie="search3=0;expires=exp.getTime()+(3600*60*60*1000);";
			}
		}
	}
}

function setCK()
{
	var exp=new Date();
	exp.setTime(exp.getTime()+365*24*3600*1000);
	var targetText = document.getElementById("searchDiv");
	var targetDiv = document.getElementById("search");
	
	//关闭cookie	 by xsc	2004-6-3		因为对最近检索词有影响		
	if(getCookie("search"))
	{
		var cSearch=getCookie("search");
	}
	else
	{
		document.cookie="search=0;expires=exp.toGMTString()";
		var cSearch=getCookie("search");
	}
	if(cSearch==1)
	{
			targetDiv.style.display='block';
			targetText.innerText="- 关闭";
	}
	else
	{
			targetDiv.style.display='none';
			targetText.innerText="+ 打开";
	}
}

function makeStatic()
{//浮动窗口
	document.getElementById("object1").style.pixelTop=document.body.scrollTop+180;
}

function changeStyle(oStyle,sValue,oTarget)
{
	var obj=document.getElementById(oTarget)

	if ( obj!=null )
	{
		if(sValue.indexOf("恢复")>-1)
		{
			sValue='';
		}
		eval(oTarget+".runtimeStyle."+oStyle+"='"+sValue+"'");
	}
}
function setIFrameSize(aFmId,aTbId,aExArea,bTree)
{
	/**参数说明：
	 *aFmName:父级目标iframe的id号。
	 *aTbId:当前页面主table的id号. 
	 *aExArea:动态扩展区域的id号，如：打开/关闭　快速检索 .
	 *bTree:boolean 型值，是/否树型页面调用，createtree.jsp的宽度与gailan.jsp略有不同。
	**/

	var nExArea=30;
	var oFm=eval("parent.document.getElementById(\""+aFmId+"\")");
	var oTb=eval("document.getElementById(\""+aTbId+"\")");
	var oExArea=eval("document.getElementById(\""+aExArea+"\")");

	if(oFm) 
	{
			if(!bTree) 
			{
				if(oExArea)
				nExArea=(oExArea.style.display=='block')?250:120;
				oFm.style.width=document.body.scrollWidth;
			
			}
			else
			{
				oFm.style.width=oTb.offsetWidth;
			}

			oFm.style.height=oTb.offsetHeight+nExArea;
	}
			//注意:还需要在TRS_display_search()中调用　本方法
}