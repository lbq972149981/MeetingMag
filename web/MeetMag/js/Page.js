/**
*=================================================================
*Name:			叶子js分页样式（ShowoPage Style With JS）
*RCSfile:		Page.js
*Revision:		0.05Beta
*Author:		Yehe(叶子)
*Released:		2005-04-21 19:50:55
*Description:	js分页样式，显示上一页下一页的翻页结果
*Contact:		QQ:311673,MSN:myehe@msn.com,http://www.yehe.org,http://www.showo.com
*=================================================================
*/

//正则替换
//输入：欲正则字符，正则表达式，替换后字符
function Reg(sStr,sReg,sRe) {
	var sS=sStr,sR=sReg,sRe=sRe;
	if ((sS.length>0)&&(sR.length>0)) {
		eval("re=/"+sR+"/gim;");
		sS=sS.replace(re,sRe);
	}
	return (sS);
}
//格式化正则中的特殊字符
function FormatReg(sReg) {
	var sR=sReg;
	var sF=new Array ("/",".","+","[","]","{","}","$","^","?","*");
	if (sR.length>0) {		
		for (i=0;i<=sF.length;i++) {
			sR=sR.replace(sF[i],"\\"+sF[i]);
		}
		sR="("+sR+")";		
	}
	return (sR);
}
//格式化页数（0表示没有,1表示有）
//欲格式化字符，是否有最小值，是否有最大值，最小值（默认值），最大值
function FormatNum(sNum,isMin,isMax,iMinNum,iMaxNum) {
	var iN,iTMin,iTMax,sN=""+sNum,iMin=iMinNum,iMax=iMaxNum;
	if (sN.length>0) {
		iN=parseInt(sN,10);
		iN=(isNaN(iN))?iMin:iN;
		iTMin=(iN<iMin)?iMin:iN;
		iTMax=(iN>iMax)?iMax:iN;
		iN=(isMin==1)?iTMin:iN;
		iN=(isMax==1)?iTMax:iN;
	}
	else {
		iN=iMin;
	}
	return (iN);
}
//页面跳转 输入框值，网址模板，页数模板，总页数，当前页
function PageJump(sPI,sU,sTP,iPC,iPI) {
	var sPL,sPV,sP;
	eval("sPL=document.getElementsByName(\""+sPI+"\").length;");
	if (sPL>1) {
		for (i=0;i<sPL;i++)	{
			eval("sPV=document.all."+sPI+"[i].value;");
			sP=FormatNum(sPV,1,1,0,iPC);
			if (sP>0) {
				location.href(sU.replace(sTP,sP));
				break;
			}
		}
	}
	else {
		eval("sPV=document.all."+sPI+".value;");
		sP=FormatNum(sPV,1,1,0,iPC);
		if (sP>0&&(sP!=iPI)) {
			location.href(sU.replace(sTP,sP));
		}
	}
}

function ShowoPage(iRecCount,iPageSize,iPageNum,sPageStart,sPageEnd,sU,sPageInput,sLPageFrist_D,sLPageFrist_E,sLPagePrev_D,sLPagePrev_E,sLPageNext_D,sLPageNext_E,sLPageLast_D,sLPageLast_E,sLPageText_D,sLPageText_E,sLPageTextF_D,sLPageTextF_E,sLPageSelect_D,sLPageSelect_E,sCssPageText,sCssPageInput,sCssPageSelect,sHtml) { 
//输入值
//iRecCount=550;//总记录条数
//iPageSize=21;//每页记录数目
//iPageNum=4;//显示的前后页数,0为显示所有,负数为这么多页面一个跳转
//sPageStart="page=";//页数开始字符,不可为空
//sPageEnd="";//页数结束字符
//sU="";//页面地址
//sPageInput="Page";//跳转页数输入框name值,下拉菜单name值
//sLPageFrist_D="首页";//首页
//sLPageFrist_E="<<";
//sLPagePrev_D="上页";//上页
//sLPagePrev_E="<";
//sLPageNext_D="下页";//下页
//sLPageNext_E=">";
//sLPageLast_D="尾页";//尾页
//sLPageLast_E=">>";
//sLPageText_D="[{$PageNum}]";//数字跳转
//sLPageText_E="第{$PageNum}页";//数字跳转
//sLPageTextF_D="[{$PageNum}]";//数字跳转
//sLPageTextF_E="第{$PageNum}页";//数字跳转
//sLPageSelect_D="&nbsp;{$PageTextF}&nbsp;";//下拉菜单跳转
//sLPageSelect_E="&nbsp;{$PageTextF}&nbsp;";//下拉菜单跳转
//sCssPageText="";//数字跳转css
//sCssPageInput="";//输入框跳转css
//sCssPageSelect="";//下拉菜单跳转css
//sHtml="";

	//基准模板设定
	sTPage="{$Page}";//页数
	sTPageCount="{$PageCount}";//总页数
	sTRecCount="{$RecCount}";//总记录数
	sTPageSize="{$PageSize}";//每页记录数
	sTPageFrist="{$PageFrist}";//首页
	sTPagePrev="{$PagePrev}";//上页
	sTPageNext="{$PageNext}";//下页
	sTPageLast="{$PageLast}";//尾页
	sTPageText="{$PageText}";//数字跳转
	sTPageTextF="{$PageTextF}";//数字跳转框架
	sTPageInput="{$PageInput}";//输入框跳转
	sTPageSelect="{$PageSelect}";//下拉菜单跳转
	sTPageNum="{$PageNum}";
	//检测输入值
	iRC=FormatNum(iRecCount,1,0,0,0);//多余
	iPS=FormatNum(iPageSize,1,0,1,0);//多余
	iPN=FormatNum(iPageNum,0,0,0,0);//多余
	iPC=(iRC%iPS==0)?(iRC/iPS):(FormatNum((iRC/iPS),1,0,0,0)+1);//计算页数
	sPI=(sPageInput.length>0)?sPageInput:"Page";//跳转页数输入框ID,name值
	sPS=(sPageStart.length>0)?sPageStart:sPI+"=";//页数开始字符
	sPE=(sPageEnd.length>0)?sPageEnd:"";//页数结束字符
	sTP=(sTPage.length>0)?sTPage:"{#Page}";//页数替换模板
	sU=(sU.length>0)?sU:""+document.location;//
	if (sU.indexOf(sPS)==-1) {	
		sU+=(sU.indexOf("?")==-1)?"?"+sPS+sTP:"&"+sPS+sTP;
		//sU=Reg(sU,"(&+)","&");
		//sU=Reg(sU,"(\?&)","\?");
		iPI=1;
	}
	else {
		sReg="(\\S.*)"+FormatReg(sPS)+"(\\d*)"+FormatReg(sPE)+"(\\S.*|\\S*)";//得到正则字符
		sPageIndex=Reg(sU,sReg,"$3");//进行正则替换，得到页数
		sU=sU.replace(sPS+sPageIndex+sPE,sPS+sTP+sPE);//得到模板替换完的url
		iPI=FormatNum(sPageIndex,1,1,0,iPC);//格式化页数为数字
	}
	PrevP=FormatNum((iPI-1),1,1,1,iPC);
	NextP=FormatNum((iPI+1),1,1,1,iPC);
	if (iPI<=1&&iPC<=1) {
		FirstPageU=sLPageFrist_D;  
		PrevPageU=sLPagePrev_D;
		NextPageU=sLPageNext_D;
		LastPageU=sLPageLast_D;
	}
	else if (iPI==1&&iPC>1) {
		FirstPageU=sLPageFrist_D; 
		PrevPageU=sLPagePrev_D;
		NextPageU="<A href=\""+sU.replace(sTPage,NextP)+"\">"+sLPageNext_E+"</A>";
		LastPageU="<A href=\""+sU.replace(sTPage,iPC)+"\">"+sLPageLast_E+"</A>";
	}
	else if (iPI==iPC) {
		FirstPageU="<A href=\""+sU.replace(sTPage,1)+"\">"+sLPageFrist_E+"</A>";
		PrevPageU="<A href=\""+sU.replace(sTPage,PrevP)+"\">"+sLPagePrev_E+"</A>";
		NextPageU=sLPageNext_D;
		LastPageU=sLPageLast_D;
	}
	else {
		FirstPageU="<A href=\""+sU.replace(sTPage,1)+"\">"+sLPageFrist_E+"</A>";
		PrevPageU="<A href=\""+sU.replace(sTPage,PrevP)+"\">"+sLPagePrev_E+"</A>";
		NextPageU="<A href=\""+sU.replace(sTPage,NextP)+"\">"+sLPageNext_E+"</A>";
		LastPageU="<A href=\""+sU.replace(sTPage,iPC)+"\">"+sLPageLast_E+"</A>";
	}	
	PageSelect="<Select class=\""+sCssPageSelect+"\" name=\""+sPI+"\" onChange=\"PageJump(\'"+sPI+"\',\'"+sU+"\',\'"+sTP+"\',"+iPC+","+iPI+")\">";
	PageText="";
	PageInput="<Input class=\""+sCssPageInput+"\" type=\"text\" name=\""+sPI+"\" size=\"5\" maxlength=\"10\" onkeydown=\"if (event.keyCode==13) PageJump(\'"+sPI+"\',\'"+sU+"\',\'"+sTP+"\',"+iPC+","+iPI+")\">";
	if (iPageNum<0) {
		iPageNum=Math.abs(iPageNum);
		PageStart=(iPI%iPageNum==0)?(iPI/iPageNum):(FormatNum((iPI/iPageNum),1,0,0,0));
		PageStart=(PageStart*iPageNum==iPI)?((PageStart-1)*iPageNum+1):(PageStart*iPageNum+1);
		PageEnd=FormatNum(PageStart+iPageNum,0,1,0,iPC)
	}
	else if (iPageNum==0) {
		PageStart=1;
		PageEnd=iPC;
	}
	else {
		PageStart=FormatNum((iPI-iPN),1,0,1,0);
		PageEnd=FormatNum((PageStart+iPN*2),0,1,0,iPC);
		PageStart=(PageEnd==iPC)?FormatNum((PageEnd-iPN*2),1,0,1,0):PageStart;
	}
	if (iPC>=1) {
		for (i=PageStart;i<=PageEnd;i++) {
			if (i!=iPI) {
				XX="<span class=\""+sCssPageText+"\"><A  href=\""+sU.replace(sTPage,i)+"\">"+sLPageText_E.replace(sTPageNum,i)+"</A></span>";
				PageText+=sLPageTextF_E.replace(sTPageTextF,XX);
				PageSelect+="<Option value=\""+i+"\">"+sLPageSelect_E.replace(sTPageNum,i)+"</Option>";
			}
			else {
				XX="&nbsp;<span class=\""+sCssPageText+"\">"+sLPageText_D.replace(sTPageNum,i)+"</span>&nbsp;";
				PageText+=sLPageTextF_D.replace(sTPageTextF,XX);
				PageSelect+="<Option Selected=\"Selected\">"+sLPageSelect_D.replace(sTPageNum,i)+"</Option>";
			}
		}
	}
	PageSelect+="</Select>";
	var s=sHtml;
	s=s.replace(sTPage,iPI);
	s=s.replace(sTPageCount,iPC);
	s=s.replace(sTRecCount,iRC);
	s=s.replace(sTPageSize,iPS);
	s=s.replace(sTPageFrist,FirstPageU);
	s=s.replace(sTPagePrev,PrevPageU);
	s=s.replace(sTPageNext,NextPageU);
	s=s.replace(sTPageLast,LastPageU);
	s=s.replace(sTPageText,PageText);
	s=s.replace(sTPageInput,PageInput);
	s=s.replace(sTPageSelect,PageSelect);
	document.write (s);
}