function showDate() 
{
	var sWeek = new Array("��","һ","��","��","��","��","��");
	var dNow = new Date();
	var sValue = dNow.getYear()+"��"+(dNow.getMonth()+1)+"��"+dNow.getDate()+"��"+
				 "  ����"+sWeek[dNow.getDay()];
	id_spanDate.innerText = sValue;
}	
//��ʾ��ǰʱ��
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
			targetText.innerText="- �ر�";
			document.cookie="search=1;expires=exp.getTime()+(3600*60*60*1000);";
		}
		else
		{
			targetDiv.style.display='none';
			targetText.innerText="+ ��";
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
			targetText.innerText="- �ر�";
			document.cookie="search=1;expires=exp.getTime()+(3600*60*60*1000);";
		}
		else
		{
			targetDiv.style.display='none';
			targetText.innerText=+ "��";
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
				targetText.innerText="- �ر�";
				document.cookie="search3=1;expires=exp.getTime()+(3600*60*60*1000);";
			}
			else
			{
				targetDiv.style.display='none';
				targetText.innerText="+ ��";
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
	
	//�ر�cookie	 by xsc	2004-6-3		��Ϊ�������������Ӱ��		
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
			targetText.innerText="- �ر�";
	}
	else
	{
			targetDiv.style.display='none';
			targetText.innerText="+ ��";
	}
}

function makeStatic()
{//��������
	document.getElementById("object1").style.pixelTop=document.body.scrollTop+180;
}

function changeStyle(oStyle,sValue,oTarget)
{
	var obj=document.getElementById(oTarget)

	if ( obj!=null )
	{
		if(sValue.indexOf("�ָ�")>-1)
		{
			sValue='';
		}
		eval(oTarget+".runtimeStyle."+oStyle+"='"+sValue+"'");
	}
}
function setIFrameSize(aFmId,aTbId,aExArea,bTree)
{
	/**����˵����
	 *aFmName:����Ŀ��iframe��id�š�
	 *aTbId:��ǰҳ����table��id��. 
	 *aExArea:��̬��չ�����id�ţ��磺��/�رա����ټ��� .
	 *bTree:boolean ��ֵ����/������ҳ����ã�createtree.jsp�Ŀ����gailan.jsp���в�ͬ��
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
			//ע��:����Ҫ��TRS_display_search()�е��á�������
}